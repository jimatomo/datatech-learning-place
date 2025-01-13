FROM node:20-bullseye-slim

WORKDIR /workspace/app

# install git zsh curl unzip ca-certificates
RUN apt-get update \
&& apt-get install -y  --no-install-recommends git zsh curl unzip ca-certificates \
&& apt-get -y clean \
&& rm -rf /var/lib/apt/lists/*

# Install aws cli
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
&& unzip awscliv2.zip \
&& ./aws/install \
&& rm -rf awscliv2.zip aws

# Switch to node user
RUN chown -R node:node ./
USER node

# disable telemetry
ARG NEXT_TELEMETRY_DISABLED=1
ENV NEXT_TELEMETRY_DISABLED=$NEXT_TELEMETRY_DISABLED

# Install Oh My zsh
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" \
# zsh-completions
&& git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:-${ZSH:-~/.oh-my-zsh}/custom}/plugins/zsh-completions \
# zsh-autosuggestions
&& git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions \
# plugin setting
&& sed -i -e 's/plugins=(git)/plugins=(git zsh-completions zsh-autosuggestions)/g' ~/.zshrc

CMD ["zsh"]
