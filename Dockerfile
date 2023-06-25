# Imagem base com o OpenJDK 17
FROM adoptopenjdk/openjdk17:latest

# Instalação do Node.js 18
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# Instalação do React Native CLI
RUN npm install -g react-native-cli

# Instalação do Android SDK e Platform Tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    unzip \
    wget \
    libc6-dev \
    libglu1-mesa \
    && rm -rf /var/lib/apt/lists/*
    
# Define as variáveis de ambiente necessárias para o Android SDK
ENV ANDROID_HOME /opt/android-sdk
ENV PATH $PATH:$ANDROID_HOME/tools
ENV PATH $PATH:$ANDROID_HOME/platform-tools

# Baixa e descompacta o Android SDK
RUN wget -q https://dl.google.com/android/repository/commandlinetools-linux-6858069_latest.zip -O android-sdk.zip \
    && unzip -q android-sdk.zip -d $ANDROID_HOME \
    && rm android-sdk.zip

# Aceita automaticamente as licenças do Android SDK
RUN yes | $ANDROID_HOME/tools/bin/sdkmanager --licenses

# Instalação das versões específicas das Platform Tools e Build Tools
RUN $ANDROID_HOME/tools/bin/sdkmanager "platform-tools" "build-tools;30.0.3"

# Define o diretório de trabalho
WORKDIR /app

# Copia o código-fonte do projeto para o diretório de trabalho
COPY . .

# Instala as dependências do projeto
RUN npm install

# Inicie o aplicativo
CMD ["npm", "start"]
