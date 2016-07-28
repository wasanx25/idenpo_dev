FROM ruby:2.3.0
ENV LANG C.UTF-8

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y \
      sudo git npm build-essential mysql-client libssl-dev

ENV app     idenpo
ENV deploy  /var/local/$app
ENV user    idenpo_user

RUN useradd -d /home/$user -m -s /bin/bash $user
RUN echo "$user:$user" | chpasswd
RUN echo "$user ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/$user
USER $user
ENV HOME /home/$user

RUN sudo mkdir -p $deploy
RUN sudo chown -R $user:$user $deploy
WORKDIR $deploy

# Nodejs install
RUN git clone https://github.com/creationix/nvm.git ~/.nvm

# Ruby on Rails 5
RUN sudo gem install bundler
ADD Gemfile $deploy/
ADD Gemfile.lock $deploy/
RUN sudo chown $user:$user Gemfile
RUN sudo chown $user:$user Gemfile.lock
RUN bundle install

# Angular2
ADD package.json $deploy/
ADD tsconfig.json $deploy/
ADD webpack.config.js $deploy/
RUN /bin/bash -c "source ~/.nvm/nvm.sh"
RUN nvm install 5.10.1
RUN npm install
RUN npm start
# RUN /bin/bash -l -c "nvm install 5.10.1"
# RUN /bin/bash -l -c "npm install"
# RUN /bin/bash -l -c "npm start"

EXPOSE 3000
