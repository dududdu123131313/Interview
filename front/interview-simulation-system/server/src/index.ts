import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import interviewRoutes from './routes/interview';

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// 详细的CORS配置
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 中间件
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// 添加请求日志
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// 路由
app.use('/api/interview', interviewRoutes);

// 健康检查端点
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: '面试模拟系统服务器运行正常' });
});

// HTTP服务器
const server = http.createServer(app);

// WebSocket服务器
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// WebSocket连接处理
io.on('connection', (socket) => {
  console.log('用户连接成功:', socket.id);

  // 加入面试房间
  socket.on('join-interview', (interviewId) => {
    socket.join(interviewId);
    console.log(`用户 ${socket.id} 加入了面试 ${interviewId}`);
  });

  // 面试问题处理
  socket.on('interview-question', (data) => {
    io.to(data.interviewId).emit('new-question', data);
  });

  // 面试回答处理
  socket.on('interview-answer', (data) => {
    io.to(data.interviewId).emit('new-answer', data);
  });

  // 视频/音频数据处理
  socket.on('media-data', (data) => {
    socket.to(data.interviewId).emit('media-stream', data);
  });

  // 断开连接处理
  socket.on('disconnect', () => {
    console.log('用户断开连接:', socket.id);
  });
});

// 启动服务器
server.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});

export default server; 