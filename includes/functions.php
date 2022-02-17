<?php
session_start();
require_once 'src/Mandrill.php';
class acuarela
{
	function transformMergeVars($vars){
		$mergeVars = array();
		foreach ($vars as $key => $value) {
			array_push($mergeVars, ['name'=>$key,'content'=>$value]);
		}
		return $mergeVars;
	}
	
	function send_notification($from,$to,$toname,$mergevariables,$subject,$template,$mandrillApiKey,$fromName="Mandrill Message",$async=false){
		$result = '';
		try {
			if($from==""){
				$from='info@acuarela.app';
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
		} catch(Mandrill_Error $e) {
			$result = 'Error de envío: ' . get_class($e) . ' - ' . $e->getMessage();
			$answer = false;
			throw $e;
		}
		return $result;
	}

	function sendDemoEmail($name,$mail,$phone,$daycare,$country,$city,$subject = 'Hemos recibido tus datos'){
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
		$this->send_notification('info@acuarela.app',$mail,$name,$this->transformMergeVars($mergeVars),$subject,'obtener-demo','maRkSStgpCapJoSmwHOZDg',"Acuarela");
		$this->send_notification('info@acuarela.app','empleo@acuarela.app','Admin',$this->transformMergeVars($mergevariables),'Nuevo contacto desde página web','obtener-demo-admin','maRkSStgpCapJoSmwHOZDg',"Acuarela");
	}

	function sendDemoActiveEmail($name,$mail,$pass,$subject = '¡Tu Demo está listo!'){
		$mergeVars = [
			'FNAME' => $name,
			'EMAIL' => $mail,
			'THEPASS' => $pass,
		];
		$this->send_notification('info@acuarela.app',$mail,$name,$this->transformMergeVars($mergeVars),$subject,'activaci-n-demo','maRkSStgpCapJoSmwHOZDg',"Acuarela");
	}
	function sendInvitationAdmin($name,
	$daycare,
	$licencia,
	$condado,
	$email,
	$phone,$subject = 'Nueva invitación recibida'){
		$mergeVars = [
			'NAME' => $name,
			'DAYCARE' => $daycare,
			'LICENCIA' => $licencia,
			'CONDADO' => $condado,
			'EMAIL' => $email,
			'PHONE' => $phone
		];
		$this->send_notification('info@acuarela.app','stephy@bilingualchildcaretraining.com',$name,$this->transformMergeVars($mergeVars),$subject,'invitation-admin','maRkSStgpCapJoSmwHOZDg',"Acuarela");
	}
	function setLeadInvitation($name,$daycare,$licencia,$condado,$email,$phone)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
          CURLOPT_URL => 'https://adminwebacuarela.bilingualchildcaretraining.com/wp-json/acf/v2/leads-invitation',
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'POST',
          CURLOPT_POSTFIELDS =>'{
            "title":"'.$name.'"

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
          CURLOPT_URL => 'https://elmuseodelatesta.com/admin/wp-json/acf/v3/leads-invitation/'.$theID,
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'PUT',
          CURLOPT_POSTFIELDS =>'{
			"fields":{
				"daycare_name":"'.$daycare.'",
				"licence":"'.$licencia.'",
				"condado":"'.$condado.'",
				"email":"'.$email.'",
				"phone":"'.$phone.'",
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
}


?>