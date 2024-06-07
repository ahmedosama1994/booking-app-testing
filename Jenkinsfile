pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        WORKSPACE_DIR = '/home/ahmed/app/github-app/booking-app'
        NVM_DIR = '/home/ahmed/.nvm'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ahmedosama1994/booking-app-testing.git'
            }
        }

        stage('Set Up Node.js and npm') {
            steps {
                script {
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        if [ ! -d "$NVM_DIR" ]; then
                            mkdir -p $NVM_DIR
                            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
                        fi
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm install 20 # Using Node.js 20 which you have installed
                        nvm use 20
                        npm config set scripts-prepend-node-path true
                    '''
                }
            }
        }

        stage('Check Versions') {
            steps {
                script {
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        echo "NVM Version:"
                        nvm --version
                        echo "Node.js Version:"
                        node -v
                        echo "npm Version:"
                        npm -v
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("${WORKSPACE_DIR}") {
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use 20
                        npm cache clean --force
                        npm install
                    '''
                }
            }
        }

        stage('Lint') {
            steps {
                dir("${WORKSPACE_DIR}") {
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use 20
                        npm run lint
                    '''
                }
            }
        }

        stage('Test') {
            steps {
                dir("${WORKSPACE_DIR}") {
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use 20
                        npm test
                    '''
                }
                junit 'test-results/*.xml' // Assuming Mocha outputs JUnit XML test results
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    timeout(time: 1, unit: 'HOURS') {
                        waitForQualityGate abortPipeline: true
                    }
                }
            }
        }
    }

    post {
        always {
            dir("${WORKSPACE_DIR}") {
                archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
                junit 'test-results/*.xml'
                cleanWs()
            }
        }
    }
}
