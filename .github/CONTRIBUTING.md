# Contributing to Selfcustody

Thank you for your interest in contributing to the Selfcustody toolkit!

## How to Contribute

### Reporting Issues
- If you find bugs or have feature requests, please open an issue
- Include clear steps to reproduce any bugs
- Provide context about your environment (OS, Python/Node version, etc.)

### Suggesting Improvements
- Share your experience using the toolkit
- Suggest improvements to wallet primitives, mobile UX, or web visualizer
- Propose new wallet patterns or security considerations

### Submitting Changes
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes with tests
4. Commit with clear messages
5. Push to your fork
6. Submit a Pull Request

## Development Setup

### Python Backend
```bash
python -m venv .venv
source .venv/bin/activate
pip install -e '.[news]'
python -m unittest discover
```

### Mobile App
```bash
cd selfcustody-mobile
npm install --legacy-peer-deps
npx expo start --ios
```

### Web Visualizer
```bash
cd src/web
npm install
npm run dev
```

## Code of Conduct

Please be respectful and constructive. We're building secure, user-friendly self-custody tooling for investors.

## Questions?

Open an issue with the `question` label if you need clarification or guidance.
