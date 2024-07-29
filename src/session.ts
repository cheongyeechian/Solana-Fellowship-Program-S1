// import  { Keypair, Connection, Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";


// async function main(){
//     const connection = new Connection("https://api.devnet.solana.com");
//     const payer = Keypair.fromSecretKey(Uint8Array.from([  156,  18,  16, 252, 249, 168,  86, 188, 194, 103,  45,
//   200,  22, 145,  54, 211, 155, 112,  65,  48,  42,  73,
//   190, 136, 207,  18, 253, 117,  27, 218, 149,  36, 143,
//   142,   9, 172, 250,  83,  18, 182,  20, 101, 248, 155,
//    68, 192, 177, 251,   8,   5,  79, 153, 153, 169, 180,
//    63, 150, 223, 192, 251,  11, 243,  68, 128]));

//    console.log("Payer: ", payer.publicKey.toBase58());

//    const transferTo = Keypair.generate();
//     const transaction = new Transaction().add(
//         SystemProgram.transfer({
//             fromPubkey: payer.publicKey,
//             toPubkey: transferTo.publicKey,
//             lamports:LAMPORTS_PER_SOL * 0.1, 
//         })
// );

//     transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
//     transaction.feePayer = payer.publicKey;
//     transaction.partialSign(payer);

//     const serializedTransaction = transaction.serialize();
//    const signature = await connection.sendRawTransaction(serializedTransaction);
//    console.log("Signature: ", signature)
// }
// main();
