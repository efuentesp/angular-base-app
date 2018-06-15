pipeline {
    agent {
        docker {
            image 'node:6' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'sleep 8' 
            }
        }
        stage('Unit Test') { 
            steps {
                sh 'sleep 3'
            }
        }
        stage('Quality') {
            parallel {
                stage('Covertura Code') {
                    steps {
                        sh 'sleep 5'
                        echo "Executing Cobertura"
                    }
                }
                stage('Analysis Code') {
                    steps {
                        sh 'sleep 8'
                        echo "Executing SonarQube"
                    }
                }
            }
        }
        stage('Deploy development environment') { 
            steps {
                sh 'sleep 10'
            }
        }
        stage('Browser Tests') {
            parallel {
                stage('Chrome') {
                    steps {
                        sh 'sleep 2'
                        echo "Chrome Tests"
                        sh "docker images"
                        sh "pwd"
                    }
                }
                stage('Firefox') {
                    steps {
                        sh 'sleep 3'
                        echo "Firefox Tests"
                    }
                }
            }
        }
        stage('Functional Test') { 
            steps {
                sh 'sleep 3'
            }
        }
        stage('Deploy Staging Environment') {
            steps {
                sh 'sleep 7'
            }
        }
        stage('Repository Manager') {
            steps {
                sh 'sleep 7'
            }
        }
    }
    post {
        always {
            echo "Steps Post"
        }
        
    }
}
