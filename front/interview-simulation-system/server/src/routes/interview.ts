import { Router } from 'express';
import { getInterviewScenarios, startInterview, submitInterviewData } from '../controllers/interviewController';

const router = Router();

// 获取所有面试场景
router.get('/scenarios', getInterviewScenarios);

// 开始新的面试
router.post('/start', startInterview);

// 提交面试数据
router.post('/submit-data', submitInterviewData);

export default router; 