pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        WORKSPACE_DIR = '/home/ahmed/app/github-app/booking-app'
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
                    // Install nvm and use the correct Node.js version
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
                        nvm install --lts
                        nvm use --lts
                        npm config set scripts-prepend-node-path true
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("${WORKSPACE_DIR}") {
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
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
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
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
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
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
