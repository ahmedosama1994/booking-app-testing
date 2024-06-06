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

        stage('Install Dependencies') {
            steps {
                script {
                    // Install Node.js and npm if not installed
                    if (!isUnix()) {
                        bat 'choco install nodejs-lts'
                    }
                }
                sh 'npm cache clean --force'
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                script {
                    // Run ESLint
                    
                    sh 'npm run lint'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Run tests
                    sh 'npm test'
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
            archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
            junit 'test-results/*.xml'
            cleanWs()
        }
    }
}
