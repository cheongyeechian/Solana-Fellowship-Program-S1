import { Keypair, Connection, Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Command } from "commander";

//Build a cli wallet that generates a keypair and can send sol
const program = new Command();

program
  .name("solana-cli-wallet")
  .description("CLI wallet for Solana")
  .version("1.0.0");

program
  .command("generate")
  .description("Generate a new keypair")
  .action(() => {
    const keypair = Keypair.generate();
    console.log("Public Key:", keypair.publicKey.toBase58());
    console.log("Secret Key:", keypair.secretKey);
  });

program
  .command("airdrop")
  .description("Request airdrop of SOL")
  .argument("<publicKey>", "Public key to receive SOL")
  .action(async (publicKey) => {
    const connection = new Connection("https://api.devnet.solana.com");
    const pk = new PublicKey(publicKey);
    const airdropSignature = await connection.requestAirdrop(pk, LAMPORTS_PER_SOL);
    await connection.confirmTransaction(airdropSignature);
    console.log(`Airdropped 1 SOL to ${publicKey}`);
  });

program
  .command("send")
  .description("Send SOL to another address")
  .argument("<secretKey>", "Sender's secret key")
  .argument("<recipientPublicKey>", "Recipient's public key")
  .argument("<amount>", "Amount of SOL to send")
  .action(async (secretKey, recipientPublicKey, amount) => {
    const connection = new Connection("https://api.devnet.solana.com");
    const payer = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(secretKey)));
    const recipient = new PublicKey(recipientPublicKey);
    const amountInLamports = LAMPORTS_PER_SOL * parseFloat(amount);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: recipient,
        lamports: amountInLamports,
      })
    );

    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.feePayer = payer.publicKey;
    transaction.partialSign(payer);

    const serializedTransaction = transaction.serialize();
    const signature = await connection.sendRawTransaction(serializedTransaction);
    await connection.confirmTransaction(signature);
    console.log("Transaction signature:", signature);
  });

program.parse(process.argv);