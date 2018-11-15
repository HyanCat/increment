const Koa = require('koa')
const ratelimit = require('koa-ratelimit')
const Redis = require('ioredis')
const app = new Koa()
const redis = new Redis({
    port: 6379,
    host: 'redis',
    family: 4,
    password: 'secret',
    db: 0
})

app.use(
    ratelimit({
        db: redis,
        duration: 60000,
        errorMessage: {
            'error': 'Sometimes You Just Have to Slow Down.'
        },
        id: (ctx) => ctx.ip,
        headers: {
            remaining: 'Rate-Limit-Remaining',
            reset: 'Rate-Limit-Reset',
            total: 'Rate-Limit-Total'
        },
        max: 100,
        disableHeader: false,
    })
)

app.use(async ctx => {
    const appName = ctx.query.app
    const key = appName ? `increment:id:${appName}` : 'increment:id:global'
    await redis.incr(key)
        .then(v => {
            console.log(v)
            ctx.body = v
        }).catch(e => {
            console.error(e)
        })
})

app.listen(3000)
