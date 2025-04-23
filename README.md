<p align="left">
  <img src="./public/images/icons/icon-text-light.svg" alt="Lunark AI Logo" width="400" />
</p>

Web interface for the Lunark AI platform, built with Next.js, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Web3 Integration**: Connect with cryptocurrency wallets using ethers.js
- **Real-time Communication**: Socket.io integration for real-time updates
- **Modern UI**: Built with Tailwind CSS and Framer Motion for smooth animations
- **Secure Authentication**: JWT-based authentication system
- **Database Integration**: PostgreSQL database with Prisma ORM
- **Responsive Design**: Fully responsive interface that works on all devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- Yarn package manager
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lunark-ai/lunark-web.git
   cd lunark-web
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in the required values:
   ```bash
   cp .env.example .env
   ```

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

5. Run the development server:
   ```bash
   yarn dev
   ```

Your app should now be running at [http://localhost:3000](http://localhost:3000).

## 🔧 Environment Variables

Create a `.env` file with these variables:

```
API_KEY=your_api_key
API_URL=http://localhost:4545/api
DATABASE_URL=your_postgres_connection_string
ENCRYPTION_KEY=your_encryption_key
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_URL=http://localhost:4545
```

## 📖 Project Structure

```
lunark-web/
├── app/                  # Next.js application code
│   ├── api/              # API routes
│   ├── components/       # React components
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
└── ...                   # Config files
```

## 🧪 Running Tests

```bash
yarn test
```

## 📱 Deployment

Build the application for production:

```bash
yarn build
```

Start the production server:

```bash
yarn start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

Lunark AI Team - [https://lunark.ai](https://lunark.ai)

Project Link: [https://github.com/lunark-ai/lunark-web](https://github.com/lunark-ai/lunark-web) 
