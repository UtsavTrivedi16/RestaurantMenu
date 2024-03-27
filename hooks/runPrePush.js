const path = require("path");
const { spawnSync, execSync } = require("child_process");
const basePath = path.resolve(__dirname, "../../");

function isPackageJsonModified(){
    try{
        const diffOutput = execSync('git diff --cached --name-only', {cwd: basePath}).toString().trim();
        return diffOutput.split('\n').includes('package.json');
    }catch(error){
        console.error('Error occurred while checking for package.json modifications', error.message);
        process.exit(1);
    }
}

async function prePushCheck(){
    if(isPackageJsonModified()){
        console.log('Package.json has been modified. Docker image will be rebuilt for tests');
        deleteDockerImage();
        buildDockerImage();
        runUnitTestsInDocker();
        return;
    }

    console.log('Package.json has not changed since last commit.');

    if(!await isDockerImageBuilt()){
        buildDockerImage();
    }

    runUnitTestsInDocker();
}

function isDockerImageBuilt(){
    try{
        console.log('Checking if Docker image exists');
        // const containerList = spawnSync('docker', ['images', 'restaurantmenu-image:latest'], {cwd: basePath}).stdout.toString().trim();
        const containerList = execSync('docker images restaurantmenu-image:latest', {cwd: basePath}).toString().trim();
        return containerList.split('\n').includes('restaurantmenu-image');

        // return new Promise((resolve, reject) => {
        //
        //     exec(
        //         `docker images restaurantmenu-image:latest`,
        //         { cwd: modulePath },
        //         (error, stdout, stderr) => {
        //             if (error) {
        //                 // If an error occurs, see if there is still command output to log
        //                 if (stdout.length > 0) {
        //                     console.log(stdout);
        //                 } else if (stderr.length > 0) {
        //                     console.error(stderr);
        //                 }
        //                 reject(error);
        //             } else {
        //                 if (stdout.length > 0) {
        //                     resolve(stdout.toString().trim().split('\n').includes('restaurantmenu-image'));
        //                 } else {
        //                     resolve(stderr);
        //                 }
        //             }
        //         }
        //     );
    }catch(error){
        console.error('Error occurred while checking docker image', error.message);
        process.exit(1);
    }

}

function runUnitTestsInDocker(){
    try{
        console.log('Running unit tests in docker container');
        spawnSync('docker', ['run', '--interactive', '--env-file', './env/.env.test', 'restaurantmenu-image', 'npm run test:unit'], {cwd: basePath}).stdout.toString().trim();
        console.log('Unit Tests run in docker successfully');
    }catch(error){
        console.error('Error occurred while running unit tests in docker container', error.message);
        process.exit(1);
    }
}

function deleteDockerImage(){
    try{
        console.log('Deleting Docker image');
        spawnSync('docker', ['rmi','-f', 'restaurantmenu-image']);
        console.log('Docker image deleted successfully');
    }catch(error){
        console.error('Error occurred while deleting docker image', error.message);
        process.exit(1);
    }
}
function buildDockerImage(){
    try{
        console.log('Building Docker image');
        spawnSync('docker', ['build', '--progress=plain', '-t', 'restaurantmenu-image', '.'], {cwd: basePath});
        console.log('Docker image built successfully');
    }catch(error){
        console.error('Error occurred while building docker image', error.message);
        return false;
    }
}

prePushCheck();