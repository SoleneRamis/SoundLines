class Draw {
    constructor(opts = {}) {
        this.position = []
        this.ctx = opts.ctx
        this.freq = 0.00015
        this.colors = ['white', '#99C5B5', '#AFECE7', '#81F499']
    }

    update() {
    }

    draw(ctx) {
        ctx.save()
        ctx.beginPath()
        for (var i = 1; i < 6; i++) {
            ctx.beginPath()
            for (var x = 0; x < canvas.width; x++) {
                if (moyenne < 10) {
                    moyenne = 1
                }
                var y = Math.sin(x * moyenne * (freq * 0.0000025) * (i / 3) + (cumul * 0.0005)) * (moyenne * 2.5)
                ctx.lineTo(x, y + canvas.height / 2)
            }
            ctx.globalAlpha = i / 10
            ctx.strokeStyle = this.colors[i % 2]
            ctx.lineWidth = 3
            ctx.stroke()
        }
        ctx.restore()
    }
} 