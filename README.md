# InstaDApp Subgraph

Subgraph to explore InstaDApp, an Autonomous Banking Portal on Emerging Blockchain based Financial Protocols.

This subgraph has been created to participate to The Graph online hackathon who runned from September 16 to September 27.

You can use the following explorer to explore the data available on the mainnet.

https://instadapp.pierrickgt.now.sh/

## Contracts & Events

The following contracts & events have been used to build this graph.

### InstaRegistry
| Network | Address                                    |
|---------|--------------------------------------------|
| Mainnet | 0x498b3BfaBE9F73db90D252bCD4Fa9548Cd0Fd981 |

```
event LogRecord (indexed address currentOwner, indexed address nextOwner, address proxy)
```

### MakerCompoundBridge
| Network | Address                                    |
|---------|--------------------------------------------|
| Mainnet | 0x37aCfEf331e6063C8507C2A69c97B4f78c770A5A |

```
event LogCompoundToMaker (uint256 cdpNum, uint256 ethAmt, uint256 daiAmt, uint256 fees, address owner)
event LogMakerToCompound (uint256 cdpNum, uint256 ethAmt, uint256 daiAmt, uint256 fees, address owner)
event LogOpen (uint256 cdpNum, address owner)
event LogWipe (uint256 cdpNum, uint256 daiAmt, uint256 mkrFee, uint256 daiFee, address owner)
```

## Entities & Queries

You can use the following entities and queries to query the data.

### UserWallet

- `id: ID!`
- `address: Bytes!` - Address of the contract created when creating an account on InstaDApp
- `owner: Bytes!` - Address of the owner of the created InstaDApp contract
- `transactionHash: Bytes!`
- `timestamp: BigInt!`

```
{
  userWallets(orderBy: timestamp, orderDirection: desc) {
    id
    address
    owner
    transactionHash
    timestamp
  }
}
```

### UserWalletTransferred

- `id: ID!`
- `address: Bytes!` - Address of the contract created when creating an account on InstaDApp
- `currentOwner: Bytes!` - Address of the current owner of the created InstaDApp contract
- `nextOwner: Bytes!` - Address of the next owner of the created InstaDApp contract
- `transactionHash: Bytes!`
- `timestamp: BigInt!`

```
{
  userWalletTransferreds(orderBy: timestamp, orderDirection: desc) {
    id
    address
    currentOwner
    nextOwner
    transactionHash
    timestamp
  }
}
```

### OpenedCDP

- `id: ID!`
- `cdpNumber: BigInt!` - Opened CDP number
- `owner: Bytes!` - Address of the CDP owner
- `transactionHash: Bytes!`
- `timestamp: BigInt!`

```
{
  openedCDPs(orderBy: timestamp, orderDirection: desc) {
    id
    cdpNumber
    owner
    transactionHash
    timestamp
  }
}
```

### WipedCDP

- `id: ID!`
- `cdpNumber: BigInt!` - Wiped CDP number
- `owner: Bytes!` - Address of the CDP owner
- `daiAmount: BigInt!` - Amount of DAI wiped
- `daiFee: BigInt!` - DAI fees
- `makerFee: BigInt!` - Maker fees
- `transactionHash: Bytes!`
- `timestamp: BigInt!`

```
{
  wipedCDPs(orderBy: timestamp, orderDirection: desc) {
    id
    cdpNumber
    owner
    daiAmount
    daiFee
    makerFee
    transactionHash
    timestamp
  }
}
```

### CompoundToMaker

- `id: ID!`
- `cdpNumber: BigInt!` - Transferred CDP number
- `owner: Bytes!` - Address of the CDP owner
- `daiAmount: BigInt!` - Amount of DAI transferred
- `ethAmount: BigInt!` - Amount of ETH transferred
- `fees: BigInt!` - Paid fees
- `transactionHash: Bytes!`
- `timestamp: BigInt!`

```
{
  compoundToMakers(orderBy: timestamp, orderDirection: desc) {
    id
    cdpNumber
    owner
    daiAmount
    ethAmount
    fees
    transactionHash
    timestamp
  }
}
```

### MakerToCompound

- `id: ID!`
- `cdpNumber: BigInt!` - Transferred CDP number
- `owner: Bytes!` - Address of the CDP owner
- `daiAmount: BigInt!` - Amount of DAI transferred
- `ethAmount: BigInt!` - Amount of ETH transferred
- `fees: BigInt!` - Paid fees
- `transactionHash: Bytes!`
- `timestamp: BigInt!`

```
{
    makerToCompounds(orderBy: timestamp, orderDirection: desc) {
    id
    cdpNumber
    owner
    daiAmount
    ethAmount
    fees
    transactionHash
    timestamp
  }
}
```
