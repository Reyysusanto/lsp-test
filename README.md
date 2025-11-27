# LSP Project — Next.js App Router + Prisma + PostgreSQL

Project ini merupakan aplikasi berbasis **Next.js (App Router)** dengan fitur autentikasi, manajemen data menggunakan **Prisma ORM**, koneksi ke **PostgreSQL**, dan pengelolaan state data memakai **React Query**.  
Project ini dikembangkan untuk keperluan **LSP / Uji Kompetensi**.

---

## 🚀 Tech Stack & Library

### **Frontend**

- **Next.js 16 (App Router)**
- **React 19**
- **TailwindCSS 4**
- **Radix UI + Shadcn UI**
- **React Hook Form**
- **Zod** (validasi schema)
- **Lucide Icons**
- **Sonner** (toast UI)
- **Axios** (HTTP client)

### **Backend**

- **Next.js API Route (app/api/...)**
- **Prisma ORM v7**
- **PostgreSQL** (`pg` driver)
- **jsonwebtoken (JWT)** untuk autentikasi
- **bcrypt / bcryptjs** untuk hashing password
- **dotenv** untuk environment variables

### **Utility**

- **TanStack React Query v5**
- **class-variance-authority / clsx / tailwind-merge**
- **ESLint + TypeScript + tsx**

---

## 📁 Folder Structure (Next.js App Router)

```bash
project-root/
│
├── app/
│ ├── layout.tsx
│ ├── page.tsx
│ │
│ ├── login/
│ │ └── page.tsx
│ │
│ ├── dashboard/
│ │ └── page.tsx
│ │
│ ├── api/
│ ├── auth/
│ │ ├── register/route.ts
│ │ └── login/route.ts
│ │
│ ├── user/
│ │ └── route.ts
│ │
│ └── ... endpoint lainnya
│
├── components/
│ ├── ui/
│ └── ...
│
├── lib/
│ ├── prisma.ts
│ ├── auth.ts
│ └── utils.ts
│
├── prisma/
│ └── schema.prisma
│
├── public/
│ └── assets...
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── .env
```

Isi Env :

```bash
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/NAMA_DATABASE"
JWT_SECRET="your-secret-token"
```

## 🗄️ Prisma Setup

### **1. Generate Prisma Client**

```bash
npx prisma generate
```

### **2. Migrasi Database**

```bash
npx prisma migrate dev --name init
```

### **3. Cek Database via Prisma Studio**

```bash
npx prisma studio
```

▶️ Cara Menjalankan Project

```bash
1. Install dependencies
npm install

2. Jalankan mode development
npm run dev

Server berjalan di:
http://localhost:3000

3. Build untuk production
npm run build

4. Run mode production
npm start
```
