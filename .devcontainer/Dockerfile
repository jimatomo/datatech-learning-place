FROM node:20-bullseye-slim

WORKDIR /workspace/app

# install git zsh curl unzip ca-certificates
RUN apt-get update \
&& apt-get install -y  --no-install-recommends git zsh curl unzip ca-certificates \
&& apt-get -y clean \
&& rm -rf /var/lib/apt/lists/*

RUN chown -R node:node ./
USER node

# disable telemetry
ARG NEXT_TELEMETRY_DISABLED=1
ENV NEXT_TELEMETRY_DISABLED=$NEXT_TELEMETRY_DISABLED

# AWS Lambda Runtime Interface Emulator
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /opt/extensions/lambda-adapter
ENV PORT=3001
ENV AWS_LWA_ENABLE_COMPRESSION=true

# Install Oh My zsh
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \
# zsh-completions
&& git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:-${ZSH:-~/.oh-my-zsh}/custom}/plugins/zsh-completions \
# zsh-autosuggestions
&& git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \
# plugin setting
&& sed -i -e 's/plugins=(git)/plugins=(git zsh-completions zsh-autosuggestions)/g' ~/.zshrc

CMD ["zsh"]
