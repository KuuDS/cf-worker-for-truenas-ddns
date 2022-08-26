/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	CF_HOST: "",

	async fetch(request) {

		if (request.method != 'GET') {
			return new Response('', { status: 405 })
		}

		const { searchParams } = new URL(request.url)

		const metadata = {
			authorization: searchParams.get("password"),
			zoneId: searchParams.get("zone_id"),
			domainId: searchParams.get("domain_id"),
			domainName: searchParams.get("domain_name"),
			ip: searchParams.get("ip"),
		}

		const url = "https://api.cloudflare.com/client/v4"
			+ "/zones/" + metadata.zoneId
			+ "/dns_records/" + metadata.domainId

		const init = {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				'authorization': 'Bearer ' + metadata.authorization
			},
			body: JSON.stringify({
				type: 'A',
				name: metadata.domainName,
				content: metadata.ip
			})
		}

		const response = await fetch(url, init)
		const body = await response.text
		if (response.status != 200) {
			console.log(body)
		}

		return new Response(body, {
			status: response.status,
			headers: {
				'content-type': 'application/json'
			}
		})
	}
}
