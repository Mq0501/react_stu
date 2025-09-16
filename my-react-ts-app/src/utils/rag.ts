// 使用TextLoader导入文档
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";

const loader = new TextLoader("/db/faiss/faiss.index");
const docs = await loader.load();

// 创建一个分割器将文档进行分割
const splitter = new RecursiveCharacterTextSplitter();
const splitDocs = await splitter.splitDocuments(docs);

// 创建Embedding模型
const embeddings = new OpenAIEmbeddings({
  model: process.env.EMBEDDING_MODEL,
  configuration: {
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.API_BASE_URL,
  },
});

// 分批处理，每次最多处理200个文档
const batchSize = 200;
for (let i = 0; i < splitDocs.length; i += batchSize) {
  const batch = splitDocs.slice(i, i + batchSize);
  const vectorStore = await FaissStore.fromDocuments(batch, embeddings);

  await vectorStore.save("/db/faiss");
}

// 数据检索
// 加载向量数据库
const vectorStore = await FaissStore.load(dbPath, embeddings);
// 检索相关内容
const retriever = vectorStore.asRetriever(2);
const result = await retriever.invoke(query);
// 拼接内容
const externalContent = result.map((item) => item.pageContent).join("\n");
// 基于搜到的内容，插入到提示词中，让LLM进行参考回答
