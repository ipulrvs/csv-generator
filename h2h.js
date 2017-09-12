$(function(){

	var headerFK = [
		"FK", 
		"KD_JENIS_TRANSAKSI", 
		"FG_PENGGANTI", 
		"NOMOR_FAKTUR", 
		"MASA_PAJAK", 
		"TAHUN_PAJAK", 
		"TANGGAL_FAKTUR", 
		"NPWP", 
		"NAMA", 
		"ALAMAT_LENGKAP", 
		"JUMLAH_DPP", 
		"JUMLAH_PPN", 
		"JUMLAH_PPNBM",
		"ID_KETERANGAN_TAMBAHAN",
		"FG_UANG_MUKA",
		"UANG_MUKA_DPP",
		"UANG_MUKA_PPN",
		"UANG_MUKA_PPNBM",
		"REFERENSI"
	]
	var headerLT = [
		"LT",
		"NPWP",
		"NAMA",
		"JALAN",
		"BLOK",
		"NOMOR",
		"RT",
		"RW",
		"KECAMATAN",
		"KELURAHAN",
		"KABUPATEN",
		"PROPINSI",
		"KODE_POS",
		"NOMOR_TELEPON",
		"",
		"",
		"",
		"",
		""
	]
	var headerOF = [
		"OF",
		"KODE_OBJEK",
		"NAMA",
		"HARGA_SATUAN",
		"JUMLAH_BARANG",
		"HARGA_TOTAL",
		"DISKON",
		"DPP",
		"PPN",
		"TARIFPPNBM",
		"PPNBM",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		""
	]
	
	var sources = [];
	var sourcesIndex = 0;
	var sourcesSize = 0;
	var bigdata = [];
	bigdata.push(headerFK);
	bigdata.push(headerLT);
	bigdata.push(headerOF);
	var sizeOF = 5;
	var reqData = 10;
	var reqContainer = [];

	var clearData = function (){
		sources = [];
		sourcesIndex = 0;
		sourcesSize = 0;
		bigdata = [];
		bigdata.push(headerFK);
		bigdata.push(headerLT);
		bigdata.push(headerOF);
		sizeOF = 5;
		reqData = 10;
		reqContainer = [];
	};

	var generateOF = function(){
		var count = 0;
		while(count < reqData){
			var randomOF = Math.floor(Math.random() * sizeOF) + 1;
			reqContainer.push({
				index: count,
				fk: 1,
				of: randomOF
			})
			sourcesSize += randomOF+1;
			count++;
		}
	};

	var generateData = function(){
		reqContainer.map(function(rowReq){
			var ofs = rowReq.of;
			var count = 0;
			var rowOF = [];
			var fkdpp = 0;
			var fkppn = 0;
			while(count < ofs){
				var source = sources[sourcesIndex];
				var random = Math.random() + "";
				var randomSplit = random.split('.');
				var randomString = randomSplit[1];
				var nama = source.name.first + " " + source.name.last;
				nama = nama.toUpperCase();
				var code = source.login.salt;
				code = code.toUpperCase();
				var harga = parseInt(randomString.slice(0, 6)) + 100000;
				var dpp = harga;
				var ppn = (harga*10) / 100;
				fkdpp += dpp;
				fkppn += ppn;
				rowOF.push([
					"OF",
					code,
					nama,
					harga,
					1,
					harga,
					0,
					dpp,
					ppn,
					0,
					0,
					"",
					"",
					"",
					"",
					"",
					"",
					"",
					""
				])
				var ofsFinal = ofs - 1;
				if(ofsFinal == count){
					sourcesIndex += 1;
					var source = sources[sourcesIndex];
					var nama = source.name.first + " " + source.name.last;
					nama = nama.toUpperCase();
					var alamat = source.location.street;
					alamat = alamat.toUpperCase();
					var code = source.login.salt;
					code = code.toUpperCase();
					var rowFinal = [];
					var random = Math.random() + "";
					var randomSplit = random.split('.');
					var randomString = randomSplit[1];
					var npwp = randomString.slice(0, 15);
					var faktur = randomString.slice(0, 13);
					var referensi = randomString.slice(0, 12);
					rowFinal.push([
						"FK", 
						"01", 
						"0", 
						faktur, 
						"9", 
						"2017", 
						"01/09/2017", 
						npwp, 
						nama, 
						alamat, 
						fkdpp, 
						fkppn, 
						"0",
						"",
						"0",
						"0",
						"0",
						"0",
						referensi
					])
					rowFinal = rowFinal.concat(rowOF);
					bigdata = bigdata.concat(rowFinal);
				}
				sourcesIndex++;
				count++;
			}
		})
	}

	var convertToCSV = function (){
		var hugeText = "";
		bigdata.map(function(row){
			row.map(function(col, colIndex){
				hugeText += '"' + col + '"';
				var final = row.length - 1;
				if(final == colIndex){
					hugeText += '\n'
				} else {
					hugeText += ';'
				}
			})
		})
		// $('#csv').html("<pre>"+hugeText+"</pre>");
		var blob = new Blob([hugeText], {type: "text/csv;charset=utf-8"});
		var random = Math.random() + "";
		var randomSplit = random.split('.');
		var randomString = randomSplit[1];
		window.saveAs(blob, "CSV_"+randomString+".csv");
	}

	var getSources = function(progressId){
		console.log(progressId)
		var count = 0;
		var getId = setInterval(function (){
			$.ajax({
				url: 'https://randomuser.me/api/?nat=us',
				dataType: 'json',
				success: function(data) {
					var source = data.results[0];
					sources.push(source)
					var sourceFinal = sourcesSize - 1;
					$("#"+progressId).attr("value", Math.ceil((count/sourceFinal) * 100));
					if(count == sourceFinal){
						clearInterval(getId);
						$("#"+progressId).attr("value", 100);
						console.log('-----Completed-----')
						console.log('-----From Requirement-----', sourcesSize, reqContainer)
						console.log('-----Sources-----', sources.length)
						generateData();
						convertToCSV();
					}
					console.log('-----Get Source-----', count)
					count++;
				}
			})
		}, 100);
	};

	$('#fksubmit').click(function (){
		clearData();
		var fieldTotal = $('#fk1').val();
		var fieldChild = $('#fk2').val();
		reqData = fieldTotal;
		sizeOF = fieldChild;
		generateOF();
		$('#replace').html('');
		var html = '\
			<div class="columns">\
				<div class="column is-11">\
					<progress class="progress is-success" value="0" max="100" style="margin-top: 10px;" id="fkprogress"></progress>\
				</div>\
				<div class="column is-1">\
					<div class="field">\
						<div class="control">\
							<button class="button is-warning" id="fkfetch" style="border-radius: 100px;">Fetch</button>\
						</div>\
					</div>\
				</div>\
			</div>\
			<table class="table" style="width: 100%;">\
				<thead>\
					<tr>\
						<th>No.</th>\
						<th>Number FK</th>\
						<th>Number OF each FK</th>\
					<tr>\
				</thead>\
				<tbody id="replace2">\
				</tbody>\
			</table>'
		$('#replace').html(html)
		reqContainer.map(function (item, itemIndex){
			var no = item.index + 1;
			var template = '<tr><td>'+no+'</td><td>'+item.fk+'</td><td>'+item.of+'</td><tr>'
			if(itemIndex < 10000){
				$('#replace2').append(template);
			}
		});
		$('#fkfetch').click(function (){
			getSources('fkprogress')
		});
	});

});