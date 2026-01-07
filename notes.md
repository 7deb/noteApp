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



#to create react app using vite 
**the function name should be in upperCase** the file name can be in smallCase **but best practise is to keep both filename and function name in capital**
u do 
├──npm create vite@latest folderName 
├──then follow instructions 
├──then npm install 
└── npm run dev 

to install tailwind css
├──npm install tailwindcss @tailwindcss/vite
go to tailwindcss.com for further details 
//first make login and signup pages


#https://ui.shadcn.com/docs/components/calendar -> calender ui 