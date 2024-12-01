const http = require('http');
const { execSync } = require('child_process');

const resolvePost = (req) =>
  new Promise((resolve) => {
    let chunk = '';
    req.on('data', (data) => {
      chunk += data;
    });
    req.on('end', () => {
      resolve(JSON.parse(chunk));
    });
  });

http
  .createServer(async (req, res) => {
    console.log('receive request');
    console.log(req.url);
    if (req.method === 'POST' && req.url === '/api/deploy') {
      const data = await resolvePost(req);

      console.log('拉取仓库最新代码');
      execSync('git pull', { stdio: 'inherit' });

      console.log('创建 docker 镜像');
      execSync(`docker build -t ${data.repository.name}-image:latest .`, {
        stdio: 'inherit',
      });

      console.log('销毁 docker 容器 ');
      execSync(
        `docker ps -a -f "name=^${data.repository.name}-container" --format="{{.Names}}" | xargs -r docker stop | xargs -r docker rm`,
        {
          stdio: 'inherit',
        },
      );

      console.log('创建 docker 容器');
      execSync(
        `docker run -d -p 8888:80 --name ${data.repository.name}-container  ${data.repository.name}-image:latest`,
        {
          stdio: 'inherit',
        },
      );

      console.log('deploy success');
      res.end('ok');
    }
  })
  .listen(3000, () => {
    console.log('server is ready');
  });
