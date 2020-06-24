import { Address, store } from '@graphprotocol/graph-ts';

import { INSTA_REGISTRY_CONTRACT_ADDRESS } from '../Constants';
import { createEventID } from '../Helpers';
import { LogRecord } from '../generated/Registry/InstaRegistry';
import { UserWallet, UserWalletTransferred } from '../generated/schema';

export function handleLogRecord(event: LogRecord): void {
    let userWallet = new UserWallet(event.params.proxy.toHexString());
    let userWalletTransferred = new UserWalletTransferred(createEventID(event));

    if (
        event.params.currentOwner.toHex() ==
        Address.fromString(INSTA_REGISTRY_CONTRACT_ADDRESS).toHex()
    ) {
        userWallet.address = event.params.proxy;
        userWallet.owner = event.params.nextOwner;
        userWallet.transactionHash = event.transaction.hash;
        userWallet.timestamp = event.block.timestamp;
        userWallet.save();
    } else {
        userWalletTransferred.address = event.params.proxy;
        userWalletTransferred.currentOwner = event.params.currentOwner;
        userWalletTransferred.nextOwner = event.params.nextOwner;
        userWalletTransferred.transactionHash = event.transaction.hash;
        userWalletTransferred.timestamp = event.block.timestamp;
        userWalletTransferred.save();

        // We remove contract address who has been transferred in order to save it again with the current owner
        store.remove('UserWallet', event.params.proxy.toHexString());

        userWallet.address = event.params.proxy;
        userWallet.owner = event.params.nextOwner;
        userWallet.transactionHash = event.transaction.hash;
        userWallet.timestamp = event.block.timestamp;
        userWallet.save();
    }
}
