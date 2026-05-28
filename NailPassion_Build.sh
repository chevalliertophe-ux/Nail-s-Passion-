#!/data/data/com.termux/files/usr/bin/bash
set -e

echo "=== Nail's Passion Premium Builder ==="

pkg update -y || true
pkg install -y nodejs git zip unzip openjdk-21

export JAVA_HOME=$PREFIX/lib/jvm/java-21-openjdk
export PATH=$JAVA_HOME/bin:$PATH

echo "Java:"
java -version || true
echo "Node:"
node -v || true

if [ ! -f package.json ]; then
  echo "ERREUR: lance ce script dans le dossier du projet Expo."
  exit 1
fi

echo "Nettoyage..."
rm -rf node_modules .expo .metro android ios package-lock.json || true

echo "Installation..."
npm install

echo "Expo fix..."
npx expo install --fix || true

echo "Prebuild Android..."
npx expo prebuild --clean || true

echo "Configuration Gradle Java 21..."
if [ -f android/gradle.properties ]; then
  echo "org.gradle.java.installations.auto-detect=false" >> android/gradle.properties
  echo "org.gradle.java.installations.paths=$JAVA_HOME" >> android/gradle.properties
fi

echo "Projet préparé."
echo ""
echo "Étapes suivantes :"
echo "1) npx expo start"
echo "2) ou eas build -p android --profile preview"
echo ""
echo "NOTE:"
echo "- Ce script prépare et reconstruit le projet."
echo "- Les fonctions premium (admin PIN, agenda, galerie, SMS, SumUp admin) doivent être codées dans le projet lui-même."
