document.addEventListener('DOMContentLoaded', function() {
    // 初始化粒子背景
    try {
        new ParticleBackground();
        console.log('粒子背景初始化成功');
    } catch (error) {
        console.error('粒子背景初始化失败:', error);
    }
    
    // 为所有卡片添加点击效果
    const cards = document.querySelectorAll('.address-card');
    cards.forEach(card => {
        const btn = card.querySelector('.access-btn');
        if (btn) {
            card.addEventListener('click', function(e) {
                // 如果点击的不是按钮本身，则触发按钮点击
                if (e.target !== btn && !e.target.closest('.access-btn')) {
                    btn.click();
                }
            });
        }
    });
    
    // 修复iOS设备上的滚动问题
    document.addEventListener('touchmove', function(e) {
        // 允许默认的触摸移动行为
    }, { passive: true });
});