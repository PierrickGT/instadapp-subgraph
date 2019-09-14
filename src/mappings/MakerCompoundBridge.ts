import { Bytes, log } from '@graphprotocol/graph-ts';
import { leftPad } from '../Helpers';

import {
    LogCompoundToMaker,
    LogMakerToCompound,
    LogOpen,
    LogWipe,
    MakerCompoundBridge,
} from '../generated/Bridges/MakerCompoundBridge';
import { TubInterface } from '../generated/Bridges/TubInterface';
import { CompoundToMaker, MakerToCompound, OpenedCDP, WipedCDP } from '../generated/schema';

export function handleLogOpen(event: LogOpen): void {
    let openedCDP = new OpenedCDP(event.params.cdpNum.toString());

    let bridgeContract = MakerCompoundBridge.bind(event.address);
    let saiAddress = bridgeContract.sai();
    let sai = TubInterface.bind(saiAddress);
    let cdpNumAsBigInt = event.params.cdpNum;
    let cdpNumAsHexString = cdpNumAsBigInt.toHexString();
    let cdpNumAsHex32String = leftPad(cdpNumAsHexString, 64);
    let cdpNum = Bytes.fromHexString(cdpNumAsHex32String) as Bytes;
    let cdpOwner = sai.cups(cdpNum).value0;

    openedCDP.cdpNumber = event.params.cdpNum;
    openedCDP.owner = cdpOwner;
    openedCDP.transactionHash = event.transaction.hash;
    openedCDP.timestamp = event.block.timestamp;
    openedCDP.save();
}

export function handleLogWipe(event: LogWipe): void {
    let wipedCDP = new WipedCDP(event.params.cdpNum.toString());

    let bridgeContract = MakerCompoundBridge.bind(event.address);
    let saiAddress = bridgeContract.sai();
    let sai = TubInterface.bind(saiAddress);
    let cdpNumAsBigInt = event.params.cdpNum;
    let cdpNumAsHexString = cdpNumAsBigInt.toHexString();
    let cdpNumAsHex32String = leftPad(cdpNumAsHexString, 64);
    let cdpNum = Bytes.fromHexString(cdpNumAsHex32String) as Bytes;
    let cdpOwner = sai.cups(cdpNum).value0;

    wipedCDP.cdpNumber = event.params.cdpNum;
    wipedCDP.owner = cdpOwner;
    wipedCDP.daiAmount = event.params.daiAmt;
    wipedCDP.daiFee = event.params.daiFee;
    wipedCDP.makerFee = event.params.mkrFee;
    wipedCDP.transactionHash = event.transaction.hash;
    wipedCDP.timestamp = event.block.timestamp;
    wipedCDP.save();
}

export function handleLogCompoundToMaker(event: LogCompoundToMaker): void {
    let compoundToMaker = new CompoundToMaker(event.params.cdpNum.toString());

    compoundToMaker.cdpNumber = event.params.cdpNum;
    compoundToMaker.owner = event.params.owner;
    compoundToMaker.daiAmount = event.params.daiAmt;
    compoundToMaker.ethAmount = event.params.ethAmt;
    compoundToMaker.fees = event.params.fees;
    compoundToMaker.transactionHash = event.transaction.hash;
    compoundToMaker.timestamp = event.block.timestamp;
    compoundToMaker.save();
}

export function handleLogMakerToCompound(event: LogMakerToCompound): void {
    let makerToCompound = new MakerToCompound(event.params.cdpNum.toString());

    makerToCompound.cdpNumber = event.params.cdpNum;
    makerToCompound.owner = event.params.owner;
    makerToCompound.daiAmount = event.params.daiAmt;
    makerToCompound.ethAmount = event.params.ethAmt;
    makerToCompound.fees = event.params.fees;
    makerToCompound.transactionHash = event.transaction.hash;
    makerToCompound.timestamp = event.block.timestamp;
    makerToCompound.save();
}
