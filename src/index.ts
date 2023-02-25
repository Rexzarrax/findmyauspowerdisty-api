
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

	data.NMI = input_nmi;
	data.StateTerritory = "StateVic";
	data.OutageLink = "www";
	data.Distributor = "PC";
  
	const json = JSON.stringify(data, null, 2);
  
	return new Response(json, {
	  headers: { 'Access-Control-Allow-Origin': '*',
	  'content-type': 'application/json;charset=UTF-8' },
	})
  }


