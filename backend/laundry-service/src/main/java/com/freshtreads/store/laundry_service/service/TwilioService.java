package com.freshtreads.store.laundry_service.service;

import com.freshtreads.store.laundry_service.config.TwilioConfig;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class TwilioService {
    private final TwilioConfig config;
    private final ConcurrentHashMap<String, String> otpMap = new ConcurrentHashMap<>();
    private final Random random = new Random();

    public void sendOtp(String phone) {
        Twilio.init(config.getAccountSid(), config.getAuthToken());
        String otp = String.valueOf(100000 + random.nextInt(900000));
        otpMap.put(phone, otp);
        System.out.println(otp);
        Message.creator(
                new com.twilio.type.PhoneNumber(phone),
                new com.twilio.type.PhoneNumber(config.getFromNumber()),
                "Your Fresh Threads OTP is: " + otp).create();
    }

    public boolean verifyOtp(String phone, String otp) {
        return otp.equals(otpMap.get(phone));
    }

    public void clearOtp(String phone) {
        otpMap.remove(phone);
    }
}
