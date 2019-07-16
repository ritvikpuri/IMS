
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Your Request for ${request.itemName} has been Approved</title>
</head>

<body>
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td align="center" valign="top" bgcolor="#6495ED"
				style="background-color: #6495ED;"><br> <br>
				<table width="600" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td align="center" valign="top" bgcolor="#FFB6C1"
							style="background-color: #FFB6C1; font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #000000; padding: 0px 15px 10px 15px;">
							
							<div style="font-size: 18px; color:blue;">
								<b>Please review the following information about your request</b>
							</div>
							
							<div style="font-size: 18px; color:blue;">
								<b>You can collect your requested item from the reception.</b>
							</div>
							
							<div style="font-size: 14px; color: red;">
							Item : ${request.itemName}<br>
							Requested : ${request.requestDate}<br>
							Accepted : ${request.acceptDate}<br>
							<br>
							Name: ${user.empName}<br>
							Id: ${user.empId}<br>
							Dept: ${user.dept}<br>
							</div>
							<div>
								<h4>Thank you for using IMS!</h4>
							</div>
						</td>
					</tr>
				</table> <br> <br></td>
		</tr>
	</table>
</body>
</html>