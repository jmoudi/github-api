import { run } from '@/runner';

const getArgs = async () => {

}
async function main(){
    console.clear()
    console.log(`Start`);
    await run();
}

main()
.catch(err => { console.error(err); process.exit(1); });