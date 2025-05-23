// 粒子背景效果
class ParticleBackground {
    // 修改粒子背景类的构造函数
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 88; // 减少粒子数量以提高性能
        this.colors = ['#ffffff']; // 白色粒子
        this.maxRadius = 3; // 最大粒子半径
        this.maxSpeed = 0.3; // 最大速度
        this.connectDistance = 100; // 连线距离
        this.connectWidth = 0.5; // 连线宽度
    
        // 设置画布样式
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none'; // 确保不会干扰用户交互
        
        // 添加到页面
        document.body.appendChild(this.canvas);
    
        // 初始化
        this.init();
        
        // 监听窗口大小变化
        window.addEventListener('resize', () => this.resize());
    }

    init() {
        // 设置画布大小
        this.resize();
        
        // 创建粒子
        this.createParticles();
        
        // 开始动画
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // 如果已经有粒子，重新创建以适应新尺寸
        if (this.particles.length > 0) {
            this.createParticles();
        }
    }

    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.particleCount; i++) {
            const radius = Math.random() * this.maxRadius + 0.5;
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const vx = (Math.random() - 0.5) * this.maxSpeed;
            const vy = (Math.random() - 0.5) * this.maxSpeed;
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            
            this.particles.push({ x, y, vx, vy, radius, color });
        }
    }

    animate() {
        // 清除画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 更新和绘制粒子
        this.updateParticles();
        this.drawParticles();
        this.connectParticles();
        
        // 循环动画
        requestAnimationFrame(() => this.animate());
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // 更新位置
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // 边界检查
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx = -particle.vx;
            }
            
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy = -particle.vy;
            }
        });
    }

    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        });
    }

    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectDistance) {
                    // 根据距离计算线条透明度
                    const opacity = 1 - (distance / this.connectDistance);
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
                    this.ctx.lineWidth = this.connectWidth;
                    this.ctx.stroke();
                }
            }
        }
    }
}