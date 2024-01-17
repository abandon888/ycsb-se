class PerformanceEvaluator {
    constructor() {
        this.startTime = 0
        this.endTime = 0
        this.totalOperations = 0
        this.successfulOperations = 0
        this.failedOperations = 0
        this.operationDurations = []
    }

    // 开始测试
    startTest () {
        this.startTime = Date.now()
    }

    // 结束测试
    endTest () {
        this.endTime = Date.now()
    }

    // 记录操作
    recordOperation (success, duration) {
        this.totalOperations++
        if (success) {
            this.successfulOperations++
        } else {
            this.failedOperations++
        }
        this.operationDurations.push(duration)
    }

    // 获取性能报告
    getPerformanceReport () {
        const totalDuration = this.endTime - this.startTime
        const averageDuration = this.operationDurations.reduce((a, b) => a + b, 0) / this.operationDurations.length
        const throughput = this.successfulOperations / (totalDuration / 1000) // 操作数/秒

        return {
            totalTime: totalDuration,
            totalOperations: this.totalOperations,
            successfulOperations: this.successfulOperations,
            failedOperations: this.failedOperations,
            averageDuration,
            throughput
        }
    }
}

// 导出 PerformanceEvaluator 类
module.exports = { PerformanceEvaluator }
