pipeline {

	agent any

	options {
		buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '5', daysToKeepStr: '', numToKeepStr: '5')
	}

	parameters {
		choice(name: 'ENV', choices:['QA', 'UAT', 'PROD'], description: 'Seleccione el entorno')
	}

	tools {
		nodejs "Node 22.0.0"
	}

	environment{
		env = "${params['ENV']}"
	}

  stages {

    stage('Git') {
      steps {
        script {
          // Mapa entorno - rama
          def branchMap = ['QA': 'develop', 'UAT': 'uat', 'PROD': 'main']
          // Rama extraída del mapa
          def branch = branchMap.get(env.env, branchMap.default)
          echo "Selected Git Branch: ${branch}"
          git branch: branch,
              url: 'https://github.com/serkuguk/angular-core.git',
              credentialsId: 'git'
        }
      }
    }

    stage('Extract Version') {
      steps {
        script {
          // Extraer el número de versión del archivo package.json
          def version = bat(script: 'node -pe "require(\'./package.json\').version"', returnStdout: true).trim()
          def regex = version =~ /(\d+\.\d+\.\d+)/
          if (regex) version = regex[0][0]
          echo "La versión del paquete es: ${version}"
          // Establecer el número de versión como el nombre del build
          currentBuild.displayName = "${version} - ${env.env}"
        }
      }
    }

    stage('Install') {
      steps {
        powershell 'npm ci'
      }
    }

    stage('Build') {
      steps {
        echo "Building ${env.env}"
        script {
          if (env.env == 'PROD') powershell 'npm run build:pro'
          else if (env.env == 'UAT') powershell 'npm run build:uat'
          else powershell 'npm run build'
        }
      }
    }

    stage('SonarQube') {
      steps {
        script {
          def scannerHome = tool 'SonarQube Scanner PROD';
          withSonarQubeEnv('SonarQube Iberdrola PROD') {
            bat "${scannerHome}/bin/sonar-scanner"
          }
        }
      }
    }

  }

  post {
    always {
        
      script {
        // Comprueba si la carpeta del entorno ejecutado existe, si no, la crea
        if(fileExists(env.env)) bat "rmdir /s /q ${env.env}"
        // Renombra la carpeta 'dist' a la carpeta del entorno ejecutado
        bat "rename dist ${env.env}"
      }
     
      // Limpia todo el directorio excepto las carpetas de entornos con los artefactos generados
      cleanWs deleteDirs: true,
              notFailBuild: true,
              patterns: [
                [pattern: 'QA/**', type: 'EXCLUDE'],
                [pattern: 'UAT/**', type: 'EXCLUDE'],
                [pattern: 'PROD/**', type: 'EXCLUDE'],
              ]
  
      // Guarda todo el workspace (carpetas de entornos con los artefactos generados)
      archiveArtifacts artifacts: '**/*', onlyIfSuccessful: true
    }
  }
}
