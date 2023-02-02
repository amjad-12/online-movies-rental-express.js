const bcryptjs = require('bcryptjs')

async function run() {
    const salt = await bcryptjs.genSalt(30);
    const hashed = await bcryptjs.hash('1234',salt);
    console.log(salt)
    console.log(hashed)
}
run()