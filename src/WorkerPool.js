import BinaryDecoderWorker from "workers/BinaryDecoderWorker.js";
import LASLAZWorker from "workers/LASLAZWorker";
import LASDecoderWorker from "workers/LASDecoderWorker.js";
//import GreyhoundBinaryDecoderWorker from "workers/GreyhoundBinaryDecoderWorker";
import DEMWorker from "workers/DEMWorker.js";
import EptLaszipDecoderWorker from "workers/EptLaszipDecoderWorker.js";
import EptBinaryDecoderWorker from "workers/EptBinaryDecoderWorker.js";


export class WorkerPool{
	
	constructor(){
		this.URLS = new Map(
		[
			["/workers/BinaryDecoderWorker.js", 0],
			["/workers/LASLAZWorker.js", 1],
			["/workers/LASDecoderWorker.js",2],
			["/workers/GreyhoundBinaryDecoderWorker.js",3],
			["/workers/DEMWorker.js",4],
			["/workers/EptLaszipDecoderWorker.js",5],
			["/workers/EptBinaryDecoderWorker.js",6]
		]);
		this.workers = {};
	}

	getWorker(url){
		if (!this.workers[url]){
			this.workers[url] = [];
		}

		if (this.workers[url].length === 0){
			var type = this.URLS.get(url);
			let worker = null;
			switch (type) {
			case 0:
				worker = new BinaryDecoderWorker();
				break;
			case 1:
				worker = new LASLAZWorker();
				break;
			case 2:
				worker = new LASDecoderWorker();
				break;
			case 3:
				throw "GreyhoundBinaryDecoderWorker not implemented";
			case 4:
				worker = new DEMWorker();
				break;
			case 5:
				worker = new EptLaszipDecoderWorker();
				break;
			case 6:
				worker = new EptBinaryDecoderWorker();
				break;
			default:
				throw "Unknown worker requested";
			};			
			this.workers[url].push(worker);
		}

		let worker = this.workers[url].pop();

		return worker;
	}

	returnWorker(url, worker){
		this.workers[url].push(worker);
	}
};

//Potree.workerPool = new Potree.WorkerPool();
