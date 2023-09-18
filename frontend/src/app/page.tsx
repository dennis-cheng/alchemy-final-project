export default function Home() {
  return (
    <section>
      <h1 className="text-4xl font-extrabold">Welcome to ZARC</h1>
      <p className="leading-7 mt-2">
        ZARC is an ERC20 token implementation which also allows users to view
        their approvals and allowances
      </p>
      <h3 className="text-2xl font-bold mt-1">Note</h3>
      <ul>
        <li>Use Sepolia testnet</li>
        <li>Use MetaMask wallet extention</li>
      </ul>
    </section>
  );
}
