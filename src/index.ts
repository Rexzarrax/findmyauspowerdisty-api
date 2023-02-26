export{}
addEventListener('fetch', (event: FetchEvent) => {
	event.respondWith(handleRequest(event.request))
});
  async function handleRequest(request: Request) {
	const data = {
	  StateTerritory: '',
	  Distributor: '',
	  OutageLink: '',
	  NMI:''
	};

	const { searchParams } = new URL(request.url)
	let input_nmi = searchParams.get('input_nmi')

	const nmi_info: Nmi_entry[] = [];
	//let nmi_info = new Map<"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8",Nmi_entry>();

	nmi_info.push({state:"ACT",Provider_name:"Evoenergy",Alphafrom:"NGGG000000",AlphaToo:"NGGGZZZZZZ",AlphaExeclude:"NGGGW",NumFrom:"7001000000",NumTo:"7001999999",Website:"https://www.evoenergy.com.au/residents/emergencies-faults-outages/outages"})
	nmi_info.push({state:"ACT",Provider_name:"Evoenergy",Alphafrom:"AAtniW00001",AlphaToo:"AtniWZZZZZ",AlphaExeclude:"",NumFrom:"",NumTo:"",Website:"https://www.evoenergy.com.au/residents/emergencies-faults-outages/outages"})
	nmi_info.push({state:"NSW",Provider_name:"Essential Energy",Alphafrom:"NAAA000000",AlphaToo:"NAAAZZZZZZ",AlphaExeclude:"NAAAW",NumFrom:"4001000000",NumTo:"4001999999",Website:"https://www.essentialenergy.com.au/outages-and-faults/power-outages"})
	nmi_info.push({state:"NSW",Provider_name:"Essential Energy",Alphafrom:"NBBB000000",AlphaToo:"NBBBZZZZZZ",AlphaExeclude:"NBBBW",NumFrom:"4508000000",NumTo:"4508099999",Website:"https://www.essentialenergy.com.au/outages-and-faults/power-outages"})
	nmi_info.push({state:"NSW",Provider_name:"Ausgrid",Alphafrom:"NCCC000000",AlphaToo:"NCCCZZZZZZ",AlphaExeclude:"NCCCW",NumFrom:"4102000000",NumTo:"4104999999",Website:"https://www.ausgrid.com.au/Outages/Current-Outages"})
	nmi_info.push({state:"NSW",Provider_name:"Essential Energy",Alphafrom:"NDDD000000",AlphaToo:"NDDDZZZZZZ",AlphaExeclude:"NDDDW",NumFrom:"4204000000",NumTo:"4204999999",Website:"https://www.essentialenergy.com.au/outages-and-faults/power-outages"})
	nmi_info.push({state:"NSW",Provider_name:"Endeavour Energy",Alphafrom:"NEEE000000",AlphaToo:"NEEEZZZZZZ",AlphaExeclude:"NEEEW",NumFrom:"4310000000",NumTo:"4319999999",Website:"https://www.endeavourenergy.com.au/outages/current-power-outages"})
	nmi_info.push({state:"",Provider_name:"Essential Energy",Alphafrom:"NFFF000000",AlphaToo:"NFFFZZZZZZ",AlphaExeclude:"NFFFW",NumFrom:"4407000000",NumTo:"4407999999",Website:"https://www.essentialenergy.com.au/outages-and-faults/power-outages"})
  

	data.NMI = input_nmi;
	nmi_info.forEach((element, index) => {
		if (element.Alphafrom.indexOf(input_nmi)){
			data.StateTerritory = nmi_info[index].state;
			data.OutageLink = nmi_info[index].Website;
			data.Distributor = nmi_info[index].Provider_name;
		}
		if (element.NumFrom.indexOf(input_nmi)){
			data.StateTerritory = nmi_info[index].state;
			data.OutageLink = nmi_info[index].Website;
			data.Distributor = nmi_info[index].Provider_name;
		}
	});
	if (data.StateTerritory == ""){
		data.StateTerritory = "no Data";
		data.OutageLink = "no Data";
		data.Distributor = "no Data";
	} 


  
	const json = JSON.stringify(data, null, 2);
  
	return new Response(json, {
	  headers: { 'Access-Control-Allow-Origin': '*',
	  'content-type': 'application/json;charset=UTF-8' },
	})
  }


  type Nmi_entry = {
	state: string;
	Provider_name: string;
	Alphafrom: string;
	AlphaToo: string;
	AlphaExeclude: string;
	NumFrom: string;
	NumTo: string;
	Website: string;
  }

