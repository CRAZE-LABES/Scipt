#!/usr/bin/env node

const { execSync } = require('child_process');

const banner = `
██████  ██████  ███████ ███████  █████╗ ███╗   ██╗███████╗
██   ██ ██   ██ ██      ██      ██   ██ ████╗  ██║██      
██████  ██████  █████   █████   ███████ ██ ██╗ ██║█████   
██   ██ ██   ██ ██      ██      ██   ██ ██  ██╗██║██      
██████  ██   ██ ███████ ███████ ██   ██ ██   █████║███████╗

        📦 Craze Installer Starting...
`;

const installerScript = `
clear
echo "${banner}"

echo "🔄 System Preparation..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl software-properties-common ca-certificates git

echo "⚙️ Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "✅ Node.js version: \$(node -v)"
echo "✅ NPM version: \$(npm -v)"

echo ""
echo "💡 Choose what to install:"
echo "1) CrazeDaemon"
echo "2) CrazePanel"
echo "3) Both"
read -p "Enter choice [1-3]: " choice

install_daemon() {
    echo "🛠 Installing CrazeDaemon..."
    git clone https://github.com/craze-labes/daemon || exit 1
    cd daemon
    npm install
    cd ..
}

install_panel() {
    echo "🔧 Installing CrazePanel..."
    git clone https://github.com/craze-labes/panel || exit 1
    cd panel
    npm install
    npm run seed
    npm run createUser
    cd ..
}

case \$choice in
    1) install_daemon ;;
    2) install_panel ;;
    3) install_daemon && install_panel ;;
    *) echo "❌ Invalid choice" ;;
esac

echo "🎉 Done! Start CrazePanel using: cd panel && node ."
`;

try {
  execSync(installerScript, { stdio: 'inherit', shell: '/bin/bash' });
} catch (e) {
  console.error("Installation failed:", e.message);
  process.exit(1);
}
