# 使用 Node.js 18 Alpine 作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 复制项目文件
COPY . .

# 安装依赖并构建
RUN npm install \
  && npm run build

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]