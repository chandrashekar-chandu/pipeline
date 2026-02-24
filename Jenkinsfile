pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "chandu7521/jenkins-demo"
        DOCKER_TAG = "latest"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub-creds') {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([string(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_CONTENT')]) {
                    writeFile file: 'kubeconfig.yaml', text: KUBECONFIG_CONTENT
                    sh '''
                    export KUBECONFIG=kubeconfig.yaml
                    kubectl set image deployment/my-node-app my-node-app=${DOCKER_IMAGE}:${DOCKER_TAG}
                    '''
                }
            }
        }
    }
}