pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        WORKSPACE_DIR = '/home/ahmed/app/github-app/booking-app'
        NVM_DIR = "${WORKSPACE_DIR}/.nvm"
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
                    catchError {
                        // Source nvm.sh script
                        sh "source $NVM_DIR/nvm.sh"
                        // Install Node.js LTS version
                        sh "nvm install --lts"
                        // Use Node.js LTS version
                        sh "nvm use --lts"
                        // Configure npm
                        sh "npm config set scripts-prepend-node-path true"
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                catchError {
                    dir("${WORKSPACE_DIR}") {
                        sh '''
                            npm ci --prefer-offline --no-audit --progress=false
                        '''
                    }
                }
            }
        }

        stage('Lint') {
            steps {
                catchError {
                    dir("${WORKSPACE_DIR}") {
                        sh '''
                            npm run lint
                        '''
                    }
                }
            }
        }

        stage('Test') {
            steps {
                catchError {
                    dir("${WORKSPACE_DIR}") {
                        sh '''
                            npm test
                        '''
                    }
                    junit 'test-results/*.xml' // Assuming Mocha outputs JUnit XML test results
                }
            }
        }

        stage('Quality Gate') {
            steps {
                catchError {
                    script {
                        timeout(time: 1, unit: 'HOURS') {
                            waitForQualityGate abortPipeline: true
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            dir("${WORKSPACE_DIR}") {
                catchError {
                    archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
                    junit 'test-results/*.xml'
                    cleanWs()
                }
            }
        }
    }
}
