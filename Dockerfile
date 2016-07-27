# idenpo_dev
FROM ruby:2.2.1
ENV LANG C.UTF-8

# Install Packages
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y \
      sudo \
      nodejs \
      git \
      build-essential \
      mysql-client 

# Application
ENV app     idenpo_dev
ENV deploy  /var/local/$app
ENV user    kikuchi

# User
RUN useradd -d /home/$user -m -s /bin/bash $user
RUN echo "$user:$user" | chpasswd
RUN echo "$user ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/$user
USER $user
ENV HOME /home/$user

# Work Directory
RUN sudo mkdir -p $deploy
RUN sudo chown -R $user:$user $deploy
WORKDIR $deploy

# Bundle Install
RUN sudo gem install bundler
ADD Gemfile $deploy/
RUN sudo chown $user:$user Gemfile
RUN bundle install

# Angular2
RUN git clone https://github.com/creationix/nvm.git ~/.nvm
RUN sudo rm /bin/sh && sudo ln -s /bin/bash /bin/sh
RUN source ~/.nvm/nvm.sh
# RUN nvm install 5.8.3

EXPOSE 3000
