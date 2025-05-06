<?php
require_once 'src/Mandrill.php';
class acuarela
{
	public $domain = "https://acuarelaadmin.acuarela.app/wp-json/wp/v2/";
	public $url = "https://acuarelaadmin.acuarela.app/";
	public $generalInfo = array();
	public $politics = array();
	public $about = array();

	function __construct()
	{
		$this->generalInfo = $this->getInfoGeneral();
		$this->politics = $this->gPolitics();
		$this->about = $this->gAbout();
	}

	function transformMergeVars($vars)
	{
		$mergeVars = array();
		foreach ($vars as $key => $value) {
			array_push($mergeVars, ['name' => $key, 'content' => $value]);
		}
		return $mergeVars;
	}

	function send_notification($from, $to, $toname, $mergevariables, $subject, $template, $mandrillApiKey, $fromName = "Mandrill Message", $async = false)
	{
		$result = '';
		try {
			if ($from == "") {
				$from = 'info@acuarela.app';
			}
			$mandrill = new Mandrill($mandrillApiKey);

			$template_name = $template;
			$template_content = array(
				array(
					'name' => $fromName,
					'content' => $subject
				)
			);

			$message = array(
				'html' => '<p>Example HTML content</p>',
				'text' => 'Example text content',
				'subject' => $subject,
				'from_email' => $from,
				'from_name' => $fromName,
				'to' => array(
					array(
						'email' => $to,
						'name' =>  $toname,
						'type' => 'to'
					)
				),

				'headers' => array('Reply-To' => $from),
				'important' => false,
				'track_opens' => null,
				'track_clicks' => null,
				'auto_text' => null,
				'auto_html' => null,
				'inline_css' => null,
				'url_strip_qs' => null,
				'preserve_recipients' => null,
				'view_content_link' => null,
				'tracking_domain' => null,
				'signing_domain' => null,
				'return_path_domain' => null,
				'merge' => true,
				'merge_language' => 'mailchimp',
				'global_merge_vars' => $mergevariables,
				'merge_vars' => array(
					array(
						'rcpt' => $to,
						'vars' => $mergevariables
					)
				)
			);

			$ip_pool = 'Main Pool';
			$send_at = date("Y-m-d");
			$result = $mandrill->messages->sendTemplate($template_name, $template_content, $message, $async, $ip_pool, $send_at);
			$answer = true;
		} catch (Mandrill_Error $e) {
			$result = 'Error de envío: ' . get_class($e) . ' - ' . $e->getMessage();
			$answer = false;
			throw $e;
		}
		return $result;
	}

	function sendDemoEmail($name, $mail, $phone, $daycare, $country, $city, $subject = 'Hemos recibido tus datos')
	{
		$mergeVars = [
			'NOMBRE' => $name
		];
		$mergevariables = [
			'ADMIN' => 'Administrador',
			'NAME' => $name,
			'EMAIL' => $mail,
			'PHONE' => $phone,
			'DAYCARE' => $daycare,
			'COUNTRY' => $country,
			'CITY' => $city
		];
		$this->send_notification('info@acuarela.app', $mail, $name, $this->transformMergeVars($mergeVars), $subject, 'obtener-demo', 'maRkSStgpCapJoSmwHOZDg', "Acuarela");
		$this->send_notification('info@acuarela.app', 'empleo@acuarela.app', 'Admin', $this->transformMergeVars($mergevariables), 'Nuevo contacto desde página web', 'obtener-demo-admin', 'maRkSStgpCapJoSmwHOZDg', "Acuarela");
	}
	function sendEndRegisterDaycare($name, $pass, $email, $subject = 'Registro finalizado')
	{
		$mergeVars = [
			'NOMBRE' => $name,
			'PASS' => $pass
		];
		$a = $this->send_notification('info@acuarela.app', $email, '', $this->transformMergeVars($mergeVars), $subject, 'registro-finalizado-de-daycare', 'maRkSStgpCapJoSmwHOZDg', "Acuarela");
		$b = $this->send_notification('info@acuarela.app', 'daniela@bilingualchildcaretraining.com', '', $this->transformMergeVars($mergeVars), $subject, 'registro-finalizado-de-daycare', 'maRkSStgpCapJoSmwHOZDg', "Acuarela");
		$c = $this->send_notification('info@acuarela.app', 'karen@bilingualchildcaretraining.com', '', $this->transformMergeVars($mergeVars), $subject, 'registro-finalizado-de-daycare', 'maRkSStgpCapJoSmwHOZDg', "Acuarela");
		// $d = $this->send_notification('info@acuarela.app','dreinovcorp@gmail.com','',$this->transformMergeVars($mergeVars),$subject,'registro-finalizado-de-daycare','maRkSStgpCapJoSmwHOZDg',"Acuarela");
		$resp['a'] = $a;
		$resp['b'] = $b;
		$resp['c'] = $c;
		$resp['d'] = $d;
		return $resp;
	}
	function sendEndRegisterDaycareCheckout($name, $pass, $email, $subject = 'Registro finalizado')
	{
		$mergeVars = [
			'NOMBRE' => $name,
			'PASS' => $pass,
			'CHECKOUT' => 1
		];
		$a = $this->send_notification('info@acuarela.app', $email, '', $this->transformMergeVars($mergeVars), $subject, 'registro-finalizado-de-daycare', 'maRkSStgpCapJoSmwHOZDg', "Acuarela");
		// $c = $this->send_notification('info@acuarela.app','karen@bilingualchildcaretraining.com','',$this->transformMergeVars($mergeVars),$subject,'registro-finalizado-de-daycare','maRkSStgpCapJoSmwHOZDg',"Acuarela");
		// $d = $this->send_notification('info@acuarela.app','dreinovcorp@gmail.com','',$this->transformMergeVars($mergeVars),$subject,'registro-finalizado-de-daycare','maRkSStgpCapJoSmwHOZDg',"Acuarela");
		$resp['a'] = $a;
		// $resp['c'] = $c;
		// $resp['d'] = $d;
		return $resp;
	}
	function sendEndRegisterAsistente($name, $pass, $email, $subject = 'Registro finalizado')
	{
		$mergeVars = [
			'NOMBRE' => $name,
			'PASS' => $pass
		];
		$a = $this->send_notification('info@acuarela.app', $email, '', $this->transformMergeVars($mergeVars), $subject, 'registro-finalizado-asistentes', 'maRkSStgpCapJoSmwHOZDg', "Acuarela");
		$resp['a'] = $a;
		return $resp;
	}

	function sendDemoActiveEmail($name, $mail, $pass, $subject = '¡Tu Demo está listo!')
	{
		$mergeVars = [
			'FNAME' => $name,
			'EMAIL' => $mail,
			'THEPASS' => $pass,
		];
		$this->send_notification('info@acuarela.app', $mail, $name, $this->transformMergeVars($mergeVars), $subject, 'activaci-n-demo', 'maRkSStgpCapJoSmwHOZDg', "Acuarela");
	}
	function sendCheckin($nameKid, $nameParent, $nameDaycare, $nameAcudiente, $time, $date, $mail, $subject = 'Check in')
	{
		$mergeVars = [
			'NOMBRENINO' => $nameKid,
			'NOMBREPADRE' => $nameParent,
			'NOMBREDAYCARE' => $nameDaycare,
			'NOMBREACUDIENTE' => $nameAcudiente,
			'HORA' => $time,
			'FECHA' => $date
		];
		return $this->send_notification('info@acuarela.app', $mail, $nameParent, $this->transformMergeVars($mergeVars), $subject, 'check-in', 'maRkSStgpCapJoSmwHOZDg', "Acuarela");
	}
	function sendCheckout($nameKid, $nameParent, $nameDaycare, $nameAcudiente, $time, $date, $mail, $subject = 'Check out')
	{
		$mergeVars = [
			'NOMBRENINO' => $nameKid,
			'NOMBREPADRE' => $nameParent,
			'NOMBREDAYCARE' => $nameDaycare,
			'NOMBREACUDIENTE' => $nameAcudiente,
			'HORA' => $time,
			'FECHA' => $date
		];
		return $this->send_notification('info@acuarela.app', $mail, $nameParent, $this->transformMergeVars($mergeVars), $subject, 'check-out', 'maRkSStgpCapJoSmwHOZDg', "Acuarela");
	}
	function sendInvitationAdmin(
		$name,
		$daycare,
		$licencia,
		$condado,
		$email,
		$phone,
		$subject = 'Nueva invitación recibida'
	) {
		$mergeVars = [
			'NAME' => $name,
			'DAYCARE' => $daycare,
			'LICENCIA' => $licencia,
			'CONDADO' => $condado,
			'EMAIL' => $email,
			'PHONE' => $phone
		];
		$resp = array();
		$a = $this->send_notification('info@acuarela.app', 'info@bilingualchildcaretraining.com', $name, $this->transformMergeVars($mergeVars), $subject, 'invitation-admin', 'maRkSStgpCapJoSmwHOZDg', "Acuarela");
		$b = $this->send_notification('info@acuarela.app', 'marcela@bilingualchildcaretraining.com', $name, $this->transformMergeVars($mergeVars), $subject, 'invitation-admin', 'maRkSStgpCapJoSmwHOZDg', "Acuarela");
		$d = $this->send_notification('info@acuarela.app', 'dreinovcorp@gmail.com', $name, $this->transformMergeVars($mergeVars), $subject, 'invitation-admin', 'maRkSStgpCapJoSmwHOZDg', "Acuarela");
		$resp['a'] = $a;
		$resp['b'] = $b;
		$resp['c'] = $c;
		$resp['d'] = $d;
		return $resp;
	}
	function setLeadInvitation($name, $daycare, $licencia, $condado, $email, $phone)
	{
		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => 'https://acuarelaadmin.acuarela.app/wp-json/acf/v2/leads-invitation',
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'POST',
			CURLOPT_POSTFIELDS => '{
            "title":"' . $name . '"

        }',
			CURLOPT_HTTPHEADER => array(
				'Authorization: Basic ZGV2ZWxvcGVyOm95RUMgdkRtbCBxT3NLIDVxU0sgR2NZQyAyTXo0',
				'Content-Type: application/json',
				'Cookie: PHPSESSID=d94a3c004cf26f50e1c2266bec0f6525'
			),
		));

		$response = curl_exec($curl);
		$response = json_decode($response);
		$theID = $response->id;
		curl_close($curl);
		$curl2 = curl_init();
		curl_setopt_array($curl2, array(
			CURLOPT_URL => 'https://elmuseodelatesta.com/admin/wp-json/acf/v3/leads-invitation/' . $theID,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'PUT',
			CURLOPT_POSTFIELDS => '{
			"fields":{
				"daycare_name":"' . $daycare . '",
				"licence":"' . $licencia . '",
				"condado":"' . $condado . '",
				"email":"' . $email . '",
				"phone":"' . $phone . '",
				}
			}',
			CURLOPT_HTTPHEADER => array(
				'Authorization: Basic ZGV2ZWxvcGVyOm95RUMgdkRtbCBxT3NLIDVxU0sgR2NZQyAyTXo0',
				'Content-Type: application/json',
				'Cookie: PHPSESSID=d94a3c004cf26f50e1c2266bec0f6525'
			),
		));
		$response2 = curl_exec($curl2);
		//$response2 = json_decode($response2);

		curl_close($curl2);

		return $response2;
	}
	function query($url, $body = "")
	{
		$endpoint = $this->domain . $url;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $endpoint);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$output = curl_exec($ch);
		$request = json_decode($output);
		curl_close($ch);
		return $request;
	}
	function getInfoGeneral()
	{
		if (isset($_SESSION['ginfo'])) {
			$gnrl = $_SESSION['ginfo'];
		} else {
			$result = $this->query("pages/14");
			$gnrl = $result;
			$_SESSION['ginfo'] = $gnrl;
		}
		return $gnrl;
	}
	function gPolitics()
	{
		if (isset($_SESSION['gpolitics'])) {
			$gnrl = $_SESSION['gpolitics'];
		} else {
			$result = $this->query("pages/196");
			$gnrl = $result;
			$_SESSION['gpolitics'] = $gnrl;
		}
		return $gnrl;
	}
	function gAbout()
	{
		if (isset($_SESSION['gAbout'])) {
			$gnrl = $_SESSION['gAbout'];
		} else {
			$result = $this->query("pages/54");
			$gnrl = $result;
			$_SESSION['gAbout'] = $gnrl;
		}
		return $gnrl;
	}
	function getHome() {}
	function gHome()
    {
        $result = $this->query("pages/29");
        return $result;
    }
	function getHomeSections()
	{
		$result = $this->query("promo-home");
		return $result;
	}
	function getFaq()
	{
		$result = $this->query("preguntas-frecuentes");
		return $result;
	}
	function getPrices()
	{
		$result = $this->query("plan-precio");
		return $result;
	}
	function getTestimonios()
	{
		$result = $this->query("testimonio");
		return $result;
	}

	function getParent($id)
	{
		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => 'https://acuarelacore.com/api/acuarelausers/' . $id,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'GET',
			CURLOPT_HTTPHEADER => array(
				'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoib2VqYXJhbWlsbG9AZ21haWwuY29tIiwiaWQiOiI2MmNjMTRhMjljMWU0MGRiZmNjZTYzY2YiLCJuYW1lIjoiT3NjYXIgSmFyYW1pbGxvIiwicGhvbmUiOiI1NTU1NTU1IiwiaWF0IjoxNjU3OTIyNTI5LCJleHAiOjE2NTgxODE3Mjl9.BA7Dmtb7HrPHLm8kjYR_z7wsoobuPPLIEobo-n4KuMc'
			),
		));

		$response = curl_exec($curl);

		curl_close($curl);
		return json_decode($response);
	}

	function getMovement($id)
	{
		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => 'https://acuarelacore.com/api/movements/' . $id,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'GET',
			CURLOPT_HTTPHEADER => array(
				'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoib2VqYXJhbWlsbG9AZ21haWwuY29tIiwiaWQiOiI2MmNjMTRhMjljMWU0MGRiZmNjZTYzY2YiLCJuYW1lIjoiT3NjYXIgSmFyYW1pbGxvIiwicGhvbmUiOiI1NTU1NTU1IiwiaWF0IjoxNjU3OTIyNTI5LCJleHAiOjE2NTgxODE3Mjl9.BA7Dmtb7HrPHLm8kjYR_z7wsoobuPPLIEobo-n4KuMc'
			),
		));
		$response = curl_exec($curl);
		curl_close($curl);
		return json_decode($response);
	}
	function updateMovement($id)
	{
		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => 'https://acuarelacore.com/api/movements/' . $id,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'PUT',
			CURLOPT_POSTFIELDS => '{
			"type": 2
		}',
			CURLOPT_HTTPHEADER => array(
				'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoib2VqYXJhbWlsbG9AZ21haWwuY29tIiwiaWQiOiI2MmNjMTRhMjljMWU0MGRiZmNjZTYzY2YiLCJuYW1lIjoiT3NjYXIgSmFyYW1pbGxvIiwicGhvbmUiOiI1NTU1NTU1IiwiaWF0IjoxNjU3OTIyNTI5LCJleHAiOjE2NTgxODE3Mjl9.BA7Dmtb7HrPHLm8kjYR_z7wsoobuPPLIEobo-n4KuMc',
				'Content-Type: application/json'
			),
		));

		$response = curl_exec($curl);
		curl_close($curl);
		return $response;
	}
}
