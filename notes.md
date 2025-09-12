step1 - npm init (just like normal node project)
step2 - npm install -D typescript @types/node (this is to install typescript as a dev dependency!!)
step3 - npx tsc --init (used to specify outdir sorcedir and bunch off stuff)
step4 - build app


basic structure 
server/
├── src/
│   ├── server.ts       
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── utils/
│   └── config/
ui/
├── lol i don't about ui

steps to integrate database (postgres db)
step1 - npm install prisma @prisma/client 
step2 - npx prisma init 

#dependencies
dev dependencies
├──  bcrypt 
└──  jsonwebtoken
