// Workloads.ts
export const Workloads = {
  // Workload A: 50% 读，50% 更新
  A: {
    readPercentage: 50,
    writePercentage: 50,
    totalOperations: 100 // 默认操作次数，可以根据需要调整
  },
  // Workload B: 95% 读，5% 更新
  B: {
    readPercentage: 95,
    writePercentage: 5,
    totalOperations: 100
  },

}
