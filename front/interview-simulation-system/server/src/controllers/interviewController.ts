import { Request, Response } from 'express';

// 预设的面试场景
const interviewScenarios = [
  {
    id: 'tech-frontend',
    name: '前端开发工程师',
    description: '面试前端开发岗位，包括HTML、CSS、JavaScript、框架等技术问题',
    questions: [
      '请介绍一下你自己和你的技术背景',
      '你对React/Vue等前端框架的理解是什么？',
      '请解释一下闭包的概念及其应用场景',
      '你如何优化前端性能？',
      '你如何处理跨浏览器兼容性问题？'
    ]
  },
  {
    id: 'tech-backend',
    name: '后端开发工程师',
    description: '面试后端开发岗位，包括数据库、API设计、系统架构等技术问题',
    questions: [
      '请介绍一下你的技术栈和项目经验',
      '你如何设计高并发系统？',
      '请解释一下数据库事务的ACID属性',
      '你如何处理分布式系统中的一致性问题？',
      '如何设计安全的RESTful API？'
    ]
  },
  {
    id: 'operations',
    name: '运维测试工程师',
    description: '面试运维和测试岗位，包括系统管理、自动化测试、CI/CD等问题',
    questions: [
      '请介绍你的运维或测试经验',
      '你如何搭建CI/CD流程？',
      '如何监控生产环境中的应用性能？',
      '你如何进行压力测试和性能测试？',
      '如何设计有效的自动化测试策略？'
    ]
  },
  {
    id: 'product',
    name: '产品经理',
    description: '面试产品岗位，包括产品设计、用户研究、需求分析等问题',
    questions: [
      '请介绍你参与设计的一个产品',
      '你如何进行用户需求分析？',
      '如何平衡产品功能与开发成本？',
      '你如何管理产品的生命周期？',
      '你如何处理用户反馈和产品迭代？'
    ]
  }
];

// 获取所有面试场景
export const getInterviewScenarios = (req: Request, res: Response) => {
  try {
    console.log('获取面试场景请求');
    console.log('可用场景数量:', interviewScenarios.length);
    
    // 设置响应头，确保前端可以访问
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    res.status(200).json({
      success: true,
      data: interviewScenarios
    });
    
    console.log('成功返回场景数据');
  } catch (error) {
    console.error('获取面试场景失败:', error);
    res.status(500).json({
      success: false,
      message: '获取面试场景失败'
    });
  }
};

// 开始新的面试
export const startInterview = (req: Request, res: Response) => {
  try {
    const { scenarioId } = req.body;
    
    // 查找选定的面试场景
    const scenario = interviewScenarios.find(s => s.id === scenarioId);
    
    if (!scenario) {
      return res.status(404).json({
        success: false,
        message: '未找到指定的面试场景'
      });
    }
    
    // 创建新的面试会话
    const interviewSession = {
      id: `interview-${Date.now()}`,
      scenarioId,
      scenarioName: scenario.name,
      startTime: new Date(),
      status: 'active',
      questions: scenario.questions
    };
    
    res.status(201).json({
      success: true,
      data: interviewSession
    });
  } catch (error) {
    console.error('开始面试失败:', error);
    res.status(500).json({
      success: false,
      message: '开始面试失败'
    });
  }
};

// 提交面试数据
export const submitInterviewData = (req: Request, res: Response) => {
  try {
    const { interviewId, type, data } = req.body;
    
    if (!interviewId || !type || !data) {
      return res.status(400).json({
        success: false,
        message: '提交的数据不完整'
      });
    }
    
    // 这里应该处理数据存储逻辑
    // 在实际应用中，我们会将数据保存到数据库
    console.log(`接收到面试数据: ${interviewId}, 类型: ${type}`);
    
    res.status(200).json({
      success: true,
      message: '数据提交成功'
    });
  } catch (error) {
    console.error('提交面试数据失败:', error);
    res.status(500).json({
      success: false,
      message: '提交面试数据失败'
    });
  }
}; 