export{}
addEventListener('fetch', (event: FetchEvent) => {
	event.respondWith(handleRequest(event.request))
});
  async function handleRequest(request: Request) {
	const { searchParams } = new URL(request.url)
	let str_input_nmi: string = searchParams.get('input_nmi')

	const nmi_info: Nmi_entry[] = [
		{state:"ACT",Provider_name:"Evoenergy",Alphafrom:"NGGG000000",AlphaToo:"NGGGZZZZZZ",AlphaExeclude:"NGGGW",NumFrom:"7001000000",NumTo:"7001999999",Website:"https://www.evoenergy.com.au/residents/emergencies-faults-outages/outages"},
		{state:"ACT",Provider_name:"Evoenergy",Alphafrom:"AAtniW00001",AlphaToo:"AtniWZZZZZ",AlphaExeclude:"",NumFrom:"",NumTo:"",Website:"https://www.evoenergy.com.au/residents/emergencies-faults-outages/outages"},
		{state:"NSW",Provider_name:"Essential Energy",Alphafrom:"NAAA000000",AlphaToo:"NAAAZZZZZZ",AlphaExeclude:"NAAAW",NumFrom:"4001000000",NumTo:"4001999999",Website:"https://www.essentialenergy.com.au/outages-and-faults/power-outages"},
		{state:"NSW",Provider_name:"Essential Energy",Alphafrom:"NBBB000000",AlphaToo:"NBBBZZZZZZ",AlphaExeclude:"NBBBW",NumFrom:"4508000000",NumTo:"4508099999",Website:"https://www.essentialenergy.com.au/outages-and-faults/power-outages"},
		{state:"NSW",Provider_name:"Ausgrid",Alphafrom:"NCCC000000",AlphaToo:"NCCCZZZZZZ",AlphaExeclude:"NCCCW",NumFrom:"4102000000",NumTo:"4104999999",Website:"https://www.ausgrid.com.au/Outages/Current-Outages"},
		{state:"NSW",Provider_name:"Essential Energy",Alphafrom:"NDDD000000",AlphaToo:"NDDDZZZZZZ",AlphaExeclude:"NDDDW",NumFrom:"4204000000",NumTo:"4204999999",Website:"https://www.essentialenergy.com.au/outages-and-faults/power-outages"},
		{state:"NSW",Provider_name:"Endeavour Energy",Alphafrom:"NEEE000000",AlphaToo:"NEEEZZZZZZ",AlphaExeclude:"NEEEW",NumFrom:"4310000000",NumTo:"4319999999",Website:"https://www.endeavourenergy.com.au/outages/current-power-outages"},
		{state:"NSW",Provider_name:"Essential Energy",Alphafrom:"NFFF000000",AlphaToo:"NFFFZZZZZZ",AlphaExeclude:"NFFFW",NumFrom:"4407000000",NumTo:"4407999999",Website:"https://www.essentialenergy.com.au/outages-and-faults/power-outages"},
		{state:"NSW",Provider_name:"TransGrid",Alphafrom:"NTTTW00000",AlphaToo:"NTTTWZZZZZ",AlphaExeclude:"",NumFrom:"4608100000",NumTo:"4608108999",Website:"No Direct Outage Page"},
		{state:"NT",Provider_name:"Power and Water Corporation",Alphafrom:"",AlphaToo:"",AlphaExeclude:"",NumFrom:"2500000000",NumTo:"2502999999",Website:"https://www.powerwater.com.au/customers/outages"},
		{state:"NT",Provider_name:"Power and Water Corporation",Alphafrom:"",AlphaToo:"",AlphaExeclude:"",NumFrom:"2503000000",NumTo:"2509999999",Website:"https://www.powerwater.com.au/customers/outages"},
		{state:"QLD",Provider_name:"ENERGEX Limited",Alphafrom:"QB00000000",AlphaToo:"QB99ZZZZZZ",AlphaExeclude:"QB..W",NumFrom:"3100000000",NumTo:"3199999999",Website:"https://www.energex.com.au/home/power-outages/outage-finder/outage-finder-map"},
		{state:"QLD",Provider_name:"Ergon Energy Corporation Limited",Alphafrom:"",AlphaToo:"",AlphaExeclude:"",NumFrom:"3000000000",NumTo:"3099999999",Website:"https://www.ergon.com.au/network/outages-and-disruptions/power-outages/outage-finder-map"},
		{state:"QLD",Provider_name:"Qld Electricity Transmission Corp(Powerlink)",Alphafrom:"",AlphaToo:"",AlphaExeclude:"",NumFrom:"3202000000",NumTo:"3202009999",Website:"https://www.powerlink.com.au/outages"},
		{state:"SA",Provider_name:"SA Power Networks",Alphafrom:"SAAA000000",AlphaToo:"SAAAZZZZZZ",AlphaExeclude:"SAAAW",NumFrom:"2001000000",NumTo:"2002999999",Website:"https://www.sapowernetworks.com.au/outages/"},
		{state:"SA",Provider_name:"ElectraNet SA",Alphafrom:"StniW00000",AlphaToo:"StniWZZZZZ",AlphaExeclude:"",NumFrom:"2102000000",NumTo:"2102009999",Website:"https://www.sapowernetworks.com.au/outages/"},
		{state:"TAS",Provider_name:"TasNetworks DNSP",Alphafrom:"T000000001",AlphaToo:"T000005001",AlphaExeclude:"",NumFrom:"8000000000",NumTo:"8000999999",Website:"https://www.tasnetworks.com.au/outages"},
		{state:"TAS",Provider_name:"TasNetworks DNSP",Alphafrom:"",AlphaToo:"",AlphaExeclude:"",NumFrom:"8590200000",NumTo:"8590399999",Website:"https://www.tasnetworks.com.au/outages"},
		{state:"TAS",Provider_name:"TasNetworks TNSP",Alphafrom:"TtniW00001",AlphaToo:"TtniWZZZZZ",AlphaExeclude:"",NumFrom:"",NumTo:"",Website:"https://www.tasnetworks.com.au/outages"},
		{state:"VIC",Provider_name:"CitiPower Pty",Alphafrom:"VAAA000000",AlphaToo:"VAAAZZZZZZ",AlphaExeclude:"VAAAW",NumFrom:"6102000000",NumTo:"6103999999",Website:"https://www.citipower.com.au/power-outages-and-faults/live-outage-map/"},
		{state:"VIC",Provider_name:"Ausnet Services DNSP",Alphafrom:"VBBB000000",AlphaToo:"VBBBZZZZZZ",AlphaExeclude:"VBBBW",NumFrom:"6305000000",NumTo:"6306999999",Website:"https://www.outagetracker.com.au/"},
		{state:"VIC",Provider_name:"Powercor Australia",Alphafrom:"VCCC000000",AlphaToo:"VCCCZZZZZZ",AlphaExeclude:"VCCCW",NumFrom:"6203000000",NumTo:"6204999999",Website:"https://www.powercor.com.au/power-outages-and-faults/live-outage-map/"},
		{state:"VIC",Provider_name:"Jemena Electricity Networks (Vic) Ltd",Alphafrom:"VDDD000000",AlphaToo:"VDDDZZZZZZ",AlphaExeclude:"VDDDW",NumFrom:"6001000000",NumTo:"6001999999",Website:"https://poweroutages.jemena.com.au/"},
		{state:"VIC",Provider_name:"United Energy Distribution Pty Ltd",Alphafrom:"VEEE000001",AlphaToo:"VEEEZZZZZZ",AlphaExeclude:"VEEEW",NumFrom:"6407000000",NumTo:"6408999999",Website:"https://www.unitedenergy.com.au/outage-map/"},
		{state:"VIC",Provider_name:"Ausnet Services TNSP",Alphafrom:"VtniW00001",AlphaToo:"VtniWZZZZZ",AlphaExeclude:"",NumFrom:"6509000000",NumTo:"6509009999",Website:"https://www.outagetracker.com.au/"},
		{state:"WA",Provider_name:"Western Power",Alphafrom:"WAAA000000",AlphaToo:"WAAAZZZZZZ",AlphaExeclude:"WAAAW",NumFrom:"8001000000",NumTo:"8020999999",Website:"https://www.westernpower.com.au/faults-outages/power-outages/?"},
		{state:"WA",Provider_name:"Horizon Power",Alphafrom:"",AlphaToo:"",AlphaExeclude:"",NumFrom:"8021000000",NumTo:"8021999999",Website:"https://www.horizonpower.com.au/faults-outages/?q="},
		{state:"MISC",Provider_name:"Exempt & Miscellaneous Networks - various",Alphafrom:"NKKKNR0000",AlphaToo:"NKKKNRZZZZ",AlphaExeclude:"",NumFrom:"7102000001",NumTo:"7102999999",Website:"Various sites"},
		{state:"MISC",Provider_name:"Embedded Network Managers - Child NMIs",Alphafrom:"",AlphaToo:"",AlphaExeclude:"",NumFrom:"7102000001",NumTo:"7106999999",Website:"Various sites"},
		{state:"MISC",Provider_name:"AEMO Reserved block 1",Alphafrom:"",AlphaToo:"",AlphaExeclude:"",NumFrom:"8801000000",NumTo:"8805999999",Website:"Reserved Block"},
		{state:"MISC",Provider_name:"AEMO Reserved block 2",Alphafrom:"",AlphaToo:"",AlphaExeclude:"",NumFrom:"9000000000",NumTo:"9999999999",Website:"Reserved Block"},
	];

	const data = {
		state: 'no Data',
		Distributor: 'no Data',
		OutageLink: 'no Data',
		NMI:str_input_nmi
	  };

	//Need to add the rest of Ergon's Alphanumeric NMI's

	let int_input_nmi_pad:number = Number.parseInt(str_input_nmi.padEnd(10,"0"));

	const provider_result = nmi_info.find(nmi_data => 
		int_input_nmi_pad >= Number.parseInt(nmi_data.NumFrom) && int_input_nmi_pad <= Number.parseInt(nmi_data.NumTo)
		);
	if (!provider_result) {
	// error handling
	}

	if (provider_result) {
		data.state = provider_result.state;
		data.OutageLink = provider_result.Website;
		data.Distributor = provider_result.Provider_name;
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

