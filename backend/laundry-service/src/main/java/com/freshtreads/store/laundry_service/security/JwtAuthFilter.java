package com.freshtreads.store.laundry_service.security;

import com.freshtreads.store.laundry_service.util.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        try {
            Claims claims = jwtUtil.parseToken(token);
            String phone = claims.getSubject();
            String role = claims.get("role", String.class);

            // ✅ Set role as authority
            List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));

            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                    phone, null, authorities
            );
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(auth);

            // Optionally make role available in request
            request.setAttribute("role", role);

        } catch (JwtException e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
            return;
        }

        chain.doFilter(request, response);
    }
}
