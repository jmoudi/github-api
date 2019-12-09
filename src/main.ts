import { init } from '@/runner';

const getArgs = async () => {

}
async function main(){
    console.clear()
    console.log(`Start`);
    const args = await getArgs();
    init(args);
}

main()
.catch(err => { console.error(err); process.exit(1); });